import React, { useState } from "react";
import "./Register.css";
import FormInput from "../../FormInput";
import SubmitButton from "../../SubmitButton";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const [formInfo, setFormInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [registered, setRegistred] = useState(false);

  function handleRegister() {
    setRegistred(true);
  }

  if (registered === true) {
    return <Navigate to="/login" replace={true} />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    console.log(formInfo.password.length);

    axios({
      url: "/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formInfo),
    }).then((res) => {
      if (res.data["response"] === "success") {
        toast.success("Registred");
        handleRegister();
      } else if (res.data["response"] === "failur") {
        toast.error(res.data["reason"]);
      }
    });
    toast.error("Please verify reCaptcha");

    setFormInfo({
      email: "",
      username: "",
      password: "",
    });
    event.preventDefault();
  }

  return (
    <div className="login-register-form">
      <h1>Welcome, Register yourself here.</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          value={formInfo.email}
        />
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          handleChange={handleChange}
          value={formInfo.username}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Your super secret > 8"
          handleChange={handleChange}
          value={formInfo.password}
        />
        <SubmitButton type="submit" buttonText="Register" />
        <p>
          Already registred? <a href="/login">login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
