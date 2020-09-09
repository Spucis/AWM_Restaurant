import React, { Component } from "react";
import { render } from "react-dom";

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

  showSignUp(){
    var signupContainer = document.getElementById("SignUp");

    console.log(signupContainer.style.display)

    if (signupContainer.style.display == "block")
        signupContainer.style = "display: none"
    else
        signupContainer.style = "display: block"

    console.log(signupContainer.style.display)

  }

  render() {
    return(
        <button
            id="btnCreateUser"
            onClick={this.showSignUp.bind(this)}
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

