import React, { useState } from "react";
import InputBox from "./InputBox";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function TypingArea() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    console.log(value);
    setInput(value);
  }

  function handleSubmit(event) {
    setText(input);
    setInput("");
    event.preventDefault();
  }

  return (
    <section className="typing-area">
      <form onSubmit={handleSubmit}>
        <InputBox type="text" handleChange={handleChange} value={input} />
        <SendRoundedIcon
          className="send-icon"
          onClick={handleSubmit}
          fontSize="large"
        />
      </form>
    </section>
  );
}

export default TypingArea;
