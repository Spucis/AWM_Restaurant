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
        <div>
            <div style={{display: "block"}}>
                Username: <input type="text" name="username" maxLength="150" autoFocus="" required="" id="id_username"/>
                Password: <input type="password" name="password1" required="" id="id_password1"/>
                Confirm:  <input type="password" name="password2" required="" id="id_password2"/>
            </div>
            <CreateUserButton/>
        </div>
    )
  }
}

export default CreateUser;

const container = document.getElementById("createUser");
render(<CreateUser/>, container);

