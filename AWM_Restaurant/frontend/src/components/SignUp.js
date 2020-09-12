import React, { Component } from "react";
import { render } from "react-dom";
import { showObj } from './Utils.js';
import CreateUser from "./CreateUser"

class SignUp extends Component {
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
            <div id="SignUp" className="w3-modal">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{maxWidth: "600px"}}>

                  <div className="w3-center"><br/>
                    <span onClick={showObj.bind(this, "SignUp")} className="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                    <img src="../static/frontend/restaurant3_template_files/img_avatar.png" alt="Avatar" style={{width: "30%"}} className="w3-circle w3-margin-top"/>
                  </div>

                  <pre className="w3-center" id="SignUpErrors" style={{color: "red"}}><br/>
                  </pre>

                  <CreateUser />

                  <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button type="button" className="w3-button w3-red">Cancel</button>
                  </div>

                </div>
            </div>
        </div>
    )
  }
}

export default SignUp;

const container = document.getElementById("SignUpModal");
render(<SignUp/>, container);

