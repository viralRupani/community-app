import Header from "./pages/home/Header";
import React from "react";
import ChattingArea from "./pages/chatting-area/ChattingArea";
import Navbar from "./Navbar";
import TypingArea from "./pages/chatting-area/TypingArea";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>

      <Toaster position="top-right" reverseOrder={false} />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chatting-area"
            element={
              <>
                <ChattingArea />
                <TypingArea />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
