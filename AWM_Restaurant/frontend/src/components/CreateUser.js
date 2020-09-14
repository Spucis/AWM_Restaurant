import React, { Component } from "react";
import { render } from "react-dom";
import CreateUserButton from "./CreateUserButton"

class CreateUser extends Component {
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
        <div className="w3-container">
            <div className="w3-section" style={{display: "block"}}>
                Username: <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="username" maxLength="150" autoFocus="" required="" id="sign_username"/>
                Password 1: <input className="w3-input w3-border" type="password" name="password1" placeholder="Enter Password" required="" id="sign_password1"/>
                Password 2 (Confirm Password 1):  <input className="w3-input w3-border" type="password" name="password2" placeholder="Enter Password" required="" id="sign_password2"/>
            </div>
            <CreateUserButton/>
        </div>
    )
  }
}

export default CreateUser;


