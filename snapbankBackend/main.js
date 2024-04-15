// Import
const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { v4: uuid4 } = require("uuid");
const axios = require("axios");

// Create a new express app
const app = express();
const port = 4000;

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  secure: true, // Set to true for HTTPS
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("../snapbank/build"));

// Reference to the Mongodb driver
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

/**
 * Serve the index.html file.
 */
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../mapmap/build", "index.html"));
});

// Routes

/**
 * Test route for basic server connectivity.
 */
app.get("/Test", (req, res) => {
  res.send("Hello!");
});

app.post("/flask_app", (req, res) => {
  res.send({
    chat_response:
      "IVR stands for Interactive Voice Response. It is a technology that allows customers to interact with a computer system via voice or keypad inputs. IVR passwords are used to authenticate customers when they call the bank's automated phone system. This password is usually a combination of numbers or letters that the customer sets up for security purposes. To obtain an IVR password, customers can call our customer service hotline and follow the prompts to set up or reset their password. To register for an IVR password, customers can visit our website and follow the instructions provided to create or update their password.",
    intent: "security",
    sentiment_analysis: "neutral",
  });
});

app.post("/createUser", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("snapbank");
    const userTable = database.collection("userTable");
    let dataObj = req.body;
    dataObj["savings"] = 0;
    dataObj["chequing"] = parseFloat(1000);
    dataObj["credit"] = parseFloat(1000);
    dataObj["createdOn"] = new Date();

    console.log(typeof dataObj);
    console.log(dataObj);

    // Insert the defined document into the "userTable" collection
    const result = await userTable.insertOne(dataObj);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send({ Op_State: "Success", payLoad: result.insertedId });
  } catch (err) {
    console.log(`Somthing went wrong ${err}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
});

app.post("/authenticateUser", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("snapbank");
    const userTable = database.collection("userTable");
    let dataObj = req.body;
    const query = { email: String(dataObj["email"]).toLocaleLowerCase() };
    const options = {
      sort: { email: -1 },
    };

    // Execute query
    const user = await userTable.findOne(query);

    // Print the document returned by findOne()
    if (user !== null) {
      if (user["password"] === dataObj["password"]) {
        res.send({ Op_State: "Success", payLoad: user });
      } else {
        console.log("check the pass");
      }
    } else {
      console.log("user not found");
      res.send({ Op_State: "Failed", payLoad: user });
    }
  } catch (err) {
    console.log(`Somthing went wrong ${err}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
});

app.post("/getUserdata", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("snapbank");
    const userTable = database.collection("userTable");
    let dataObj = req.body;
    const query = { email: String(dataObj["email"]).toLocaleLowerCase() };
    const options = {
      sort: { email: -1 },
    };

    // Execute query
    const user = await userTable.findOne(query);

    // Print the document returned by findOne()
    if (user !== null) {
      res.send({ Op_State: "Success", payLoad: user });
    } else {
      console.log("user not found");
      res.send({ Op_State: "Failed", payLoad: user });
    }
  } catch (err) {
    console.log(`Somthing went wrong ${err}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
});

app.post("/chat", async (req, res) => {
  console.log(req.body);
  let dataObj = req.body;
  dataObj["createdOn"] = new Date();
  // const baseURL = "http://localhost:4000";
  const baseURL = "http://192.168.2.88:5000";
  const response = await axios.post(`${baseURL}/Test`, {
    user_input: dataObj["content"],
  });

  let payLoad = {
    messageId: dataObj.messageId,
    from: "Sammy",
    to: dataObj.from,
    content: String(response.data["chat_response"]).trim(),
    intent: response.data["intent"],
    sentiment_analysis: response.data["sentiment_analysis"],
    createdOn: new Date(),
  };
  try {
    await client.connect();
    const database = client.db("snapbank");
    const chatTable = database.collection("chatTable");

    let result = await chatTable.insertOne(dataObj);
    result = await chatTable.insertOne(payLoad);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err) {
    console.log(`Somthing went wrong ${err}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
  res.send(payLoad);
});

// HTTPS Server Configuration
const httpsOptions = {
  key: fs.readFileSync("./cert.key"),
  cert: fs.readFileSync("./cert.crt"),
};

const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app);
/**
 * Start the application and establish a connection to Neo4j.
 */
const start = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const databases = await client.db().admin().listDatabases();
    console.log("List of databases:");
    databases.databases.forEach((db) => {
      console.log(`- ${db.name}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }

  // Start the HTTPS server
  httpServer.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
  });

  // Handle closing of the server
  httpServer.on("close", async () => {
    await client.close();
  });
};

// Start the application
start();

// Insert
// try {
//
//   const database = client.db("insertDB");
//   const haiku = database.collection("haiku");

//   // Create a document to insert
//   const doc = {
//     title: "Record of a Shriveled Datum",
//     content: "No bytes, no problem. Just insert a document, in MongoDB",
//   };

//   // Insert the defined document into the "haiku" collection
//   const result = await haiku.insertOne(doc);
//
//   console.log(`A document was inserted with the _id: ${result.insertedId}`);
// } finally {
//   // Close the MongoDB client connection
//   await client.close();
// }

// Find
// try {

//   // Get the database and collection on which to run the operation
//   const database = client.db("sample_mflix");
//   const movies = database.collection("movies");
//   // Query for a movie that has the title 'The Room'
//   const query = { title: "The Room" };
//   const options = {
//     // Sort matched documents in descending order by rating
//     sort: { "imdb.rating": -1 },
//     // Include only the `title` and `imdb` fields in the returned document
//     projection: { _id: 0, title: 1, imdb: 1 },
//   };
//   // Execute query
//   const movie = await movies.findOne(query, options);
//   // Print the document returned by findOne()
//   console.log(movie);
// } finally {
//   await client.close();
// }
