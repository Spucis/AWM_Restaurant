import React, { Component } from "react";
import { render } from "react-dom";
import { showObj } from './Utils.js';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      loaded: false,
      placeholder: "Loading",
    };
  }

  render() {
    return(
        <button
            id="btnLogin"
            onClick={showObj.bind(this, "Login")}
            className="w3-button w3-border"
        >
            Login
        </button>
    );
  }
}

export default LoginButton;

const container = document.getElementById("LoginButton");
render(<LoginButton/>, container);

