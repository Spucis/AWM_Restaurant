import React, { Component } from "react";
import { render } from "react-dom";
import { showObj } from './Utils.js';

class SignUpButton extends Component {
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
            id="btnSignUp"
            onClick={showObj.bind(this, "SignUp")}
            className="w3-button w3-border"
        >
            SignUp
        </button>
    );
  }
}

export default SignUpButton;

const container = document.getElementById("SignUpButton");
render(<SignUpButton/>, container);

