import React, { useState } from "react";
import SubmitButton from "../../SubmitButton";
import "./Login.css";
import FormInput from "../../FormInput";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [loginFormInfo, setLoginFormInfo] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  function handleReCaptchaChange() {
    setCaptcha(true);
  }
  function handleLoggedIn() {
    setLoggedIn(true);
  }

  if (loggedIn === true) {
    return <Navigate to="/chatting-area" replace={true} />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginFormInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSubmit(event) {
    if (captcha) {
      axios({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(loginFormInfo),
      }).then((res) => {
        if (res.data["response"] === "success") {
          toast.success("Registred");
          handleLoggedIn();
        } else if (res.data["response"] === "failur") {
          console.log(res.data);
          console.log("there is some issue dude.");
          toast.error("Check your email or password");
        }
      });
    } else {
      toast.error("Please verify your self");
    }

    setLoginFormInfo({
      email: "",
      password: "",
    });
    event.preventDefault();
  }

  return (
    <>
      <div className="login-register-form">
        <h1>Login for chat with your friends.</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            value={loginFormInfo.email}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Your super secret"
            handleChange={handleChange}
            value={loginFormInfo.password}
          />
          <SubmitButton type="submit" buttonText="Login" />
        </form>
        <p>
          Not registred yet? <a href="/register">register here</a>
        </p>
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleReCaptchaChange}
            theme="dark"
            size="normal"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
