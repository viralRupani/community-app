import React from "react";

function Header() {
  return (
    <section className="header">
      <h1>Hello world this is header of the page</h1>
      <a href="/chatting-area">
        <button style={{ color: "black", padding: "30px" }}>Get Started</button>
      </a>
    </section>
  );
}

export default Header;
