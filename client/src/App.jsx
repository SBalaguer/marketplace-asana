import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MercadoPago from "./components/MercadoPago";
import MercadoPago2 from "./components/MercadoPago2";
import MercadoPago3 from "./components/MercadoPago3";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <MercadoPago amount={100} /> */}
      {/* <MercadoPago2 /> */}
      <MercadoPago3 />
    </div>
  );
}

export default App;
