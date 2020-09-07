import React, { Component } from "react";
import { render } from "react-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
    return (
        <div>

        </div>
    );
  }
}

export default Login;

const container = document.getElementById("f_login");
render(<Login />, container);
