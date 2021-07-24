import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "./Auth.css";
import baseUrl from "../server/server";
import querystring from "querystring";
import axios from "axios";
import StoreContext from "../Store/Context";
import Navbar from '../Navbar';

const initialState = () => {
  return { email: "", password: "", error: "" };
};

//login function
const login = async (email, password) => {
    let errorMessage = ""
    let token = ""
  if (email === "" || password === "") {
    console.log(email, password);
    errorMessage = "Email or password is blank";
    return {token: token, errorMessage: errorMessage};
  } else {
      try {
        const response = await axios.post(
        `${baseUrl}/login`,
        querystring.stringify({
            username: email,
            password: password,
        }),
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        );
        token = response.data.access_token;
        console.log(": sadsad", errorMessage);
        return {token: token, errorMessage: errorMessage};
      } catch (e) {
          console.log(e);
          errorMessage = "Invalid credentials";
            return {token: token, errorMessage: errorMessage};
      }
  }
};

export default function Auth() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  const onChange = (event) => {
    const { value, name } = event.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault(); //dont reload the page

    try {
      const {token, errorMessage} = await login(details.email, details.password);
      console.log("token1: ", token);
      console.log("errorMessage: ", errorMessage);

      if (token) {
        console.log("token: ", token);
        setToken(token);
        return history.push("/app");
      }

      if (errorMessage) {
        console.log(errorMessage);
        setError(errorMessage);
      }
    } catch (e) {
      console.log(e);
    }

    setDetails(initialState);
    setToken("");
  };

  return (
    <>
    <Navbar/>
    <div className={"login-container"}>
      <form className={"form"} onSubmit={submitHandler}>
        <div className={"top"}>
            <img className={"login-logo"} src={window.location.origin + "/images/logo-orange.png"} alt="FMdeploy.jpg"/>
            <h1>FMdeploy</h1>
        </div>
      
        <div className={"inner-form"}>
          {error && <p style={{ color: "white", textAlign: "center" }}>{error}</p>}
          <div className={"form-group"}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              value={details.email}
            />
          </div>
          <div className={"form-group"}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              value={details.password}
            />
          </div>
          <div className={"button-holder"}>
            <input type="submit" value="LOGIN" />
          </div>
        </div>
      </form>
    </div>
    </>
  );
}
