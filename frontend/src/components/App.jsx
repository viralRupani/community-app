import Header from "./pages/home/Header";
import React from "react";
import ChattingArea from "./pages/chatting-area/ChattingArea";
import Navbar from "./Navbar";
import TypingArea from "./pages/chatting-area/TypingArea";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
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
