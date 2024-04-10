import { useNavigate } from "react-router-dom";
import axios from "axios";

//SVG
import sign_up_img from ".././asserts/undraw_online_banking_re_kwqh.svg";
import sign_in_img from ".././asserts/undraw_savings_re_eq4w.svg";

//CSS
import "./LandingPage.css";

//
const baseURL = "http://localhost:4000";
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function LandingPage() {
  const navigate = useNavigate();

  function isValidEmail(email) {
    return emailPattern.test(email);
  }

  const isValidPass = (pass) => {
    return passPattern.test(pass);
  };

  function signUp() {
    document.querySelector(".container").classList.add("sign-up-mode");
  }

  function signIn() {
    document.querySelector(".container").classList.remove("sign-up-mode");
  }

  async function signInSubmit(event) {
    event.preventDefault();
    console.log("signInSubmit..............");

    let signInEmail = document.getElementById("signInEmail").value;
    let signInPass = document.getElementById("signInPass").value;

    if (isValidEmail(signInEmail)) {
      const response = await axios.post(`${baseURL}/authenticateUser`, {
        email: String(signInEmail).toLocaleLowerCase(),
        password: signInPass,
      });

      console.log("Response data:", response.data);

      // Check Notify
      if (response.data["Op_State"] === "Success") {
        localStorage.setItem("email", String(signInEmail).toLocaleLowerCase());
        navigate("/SnapBank");
        document.getElementById("sign-in-form").reset();
      } else {
        console.log("Failed");
      }
    } else {
      console.log("Enter proper email");
    }

    console.log(`signInEmail: ${signInEmail}`);
    console.log(`signInPass: ${signInPass}`);
  }

  async function signUpSubmit(event) {
    event.preventDefault();
    console.log("signUpSubmit..............");

    let signUpEmail = document.getElementById("signUpEmail").value;
    let signUpPass = document.getElementById("signUpPass").value;

    try {
      if (isValidPass(signUpPass) && isValidEmail(signUpEmail)) {
        const response = await axios.post(`${baseURL}/createuser`, {
          email: String(signUpEmail).toLocaleLowerCase(),
          password: signUpPass,
        });
        console.log("Response data:", response.data);

        // Check Notify
        if (response.data["Op_State"] === "Success") {
          console.log("Created");
          document.getElementById("sign-up-form").reset();
        } else {
          console.log("Failed");
        }
      } else {
        console.log("Enter proper email");
      }
    } catch (error) {
      console.error("Error making POST request:", error.message);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" id="sign-in-form">
              <h1 className=" font-semibold text-3xl">
                Welcome to <span className="start_letter">SnapBank</span>
              </h1>

              <div className="input-field">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="icon"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input id="signInEmail" type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="icon"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
                <input id="signInPass" type="password" placeholder="Password" />
              </div>

              <input
                type="submit"
                value="Submit"
                onClick={(event) => {
                  signInSubmit(event);
                }}
                className="btn solid"
              />
            </form>
            <form className="sign-up-form" id="sign-up-form">
              <h1 className=" font-semibold text-3xl">
                Sign up for <span className="start_letter">SnapBank</span>
              </h1>

              <div className="input-field">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="icon"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input id="signUpEmail" type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="icon"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
                <input id="signUpPass" type="password" placeholder="Password" />
              </div>

              <input
                type="submit"
                className="btn"
                value="Submit"
                onClick={(event) => {
                  signUpSubmit(event);
                }}
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Banking Simplified, Your Way.</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  signUp();
                }}
              >
                Sign up
              </button>
            </div>
            <img src={sign_in_img} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Empowering Your Financial Journey, One Click at a Time.</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => {
                  signIn();
                }}
              >
                Sign in
              </button>
            </div>
            <img src={sign_up_img} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
