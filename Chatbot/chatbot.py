import argparse
import os
from dataclasses import dataclass
from langchain.memory import ConversationSummaryBufferMemory
from langchain.chains import ConversationChain
from langchain_openai import OpenAIEmbeddings 
from langchain.prompts import ChatPromptTemplate
from langchain.vectorstores.chroma import Chroma
from langchain_openai import ChatOpenAI
from utils.preprocess import finalpreprocess
import pickle

from transformers import pipeline
import os

import warnings
warnings.filterwarnings('ignore')

abs_path = os.path.dirname(os.path.abspath(__file__))

CHROMA_PATH = os.path.join(abs_path, "chroma")

PROMPT_TEMPLATE = """
Act as a banking Chatbot and Answer the question based only on the following Question and Answer context, 
Please remember, you are the banking bot , so guide the customers accordingly. Your bank name is Scotiabank:

{context}

---

Answer the question based on the above context: {question}
"""


def sentiment_analysis(input):

    #Load a pipeline. This will download the model checkpoint from huggingface and cache it
    #locally on disk. If model is already available in cache, it will simply use the cached version
    #Download will usually take a long time, depending on network bandwidth
    sentiment_classifier = pipeline(task = "sentiment-analysis" , model = 'cardiffnlp/twitter-roberta-base-sentiment-latest')

    # #Cache usually available at : <<user-home>>.cache\huggingface\hub
    # cache_dir = os.path.expanduser('~') + "/.cache/huggingface/hub"
    # print("Huggingface Cache directory is : ", cache_dir)

    # #Contents of cache directory
    # os.listdir(cache_dir)

    #Predict sentiment using the pipeline
    sentiment_results=sentiment_classifier(input)
    print(sentiment_results) #sentiment_results[0]['label']
    return sentiment_results[0]['label']

def intent_recognition(text):

    with open(os.path.join(abs_path,r'model_artifacts\class_label_dict.pkl'), 'rb') as f:
        class_label_dict = pickle.load(f)

    question_pp = finalpreprocess(text)
    tfidf_vectorizer = pickle.load(open(os.path.join(abs_path,r'model_artifacts\tfidf1.pkl'),'rb'))
    question_vec = tfidf_vectorizer.transform([question_pp])
    lr_tfidf = pickle.load(open(os.path.join(abs_path,r'model_artifacts\logistic_reg.pkl'),'rb')) 
    pred = lr_tfidf.predict(question_vec)
    return class_label_dict[pred[0]]


def chat_response(user_query):
    # Create CLI.

    # Prepare the DB.
    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(user_query, k=3)
    if len(results) == 0 or results[0][1] < 0.7:
        print(f"Unable to find matching results.")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=user_query)
    #print(prompt)

    chat = ChatOpenAI()
    conversation = ConversationChain(
        llm=chat,
        memory=ConversationSummaryBufferMemory(llm=ChatOpenAI(), max_token_limit=2048),
        verbose=False,
    )

    response_text = conversation.invoke(input=prompt)

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    #print(formatted_response)
    return response_text['response']



if __name__ == "__main__":

    first = 0
    while True:
        if first == 0:
            print('Hello,how may I help you today')
            first+=1
        user_input = input('User : ')
        if user_input.lower() == "quit":
            break
        print('Sentiment : ', sentiment_analysis(user_input))
        print('Intent: ' , intent_recognition(user_input))
        print('Bot : ', chat_response(user_input))
