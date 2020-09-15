import React, { Component } from "react";
import { render } from "react-dom";
import { showObj } from './Utils.js';

class Login extends Component {
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
            <div id="Login" className="w3-modal">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{maxWidth: "600px"}}>

                  <div className="w3-center"><br/>
                    <span onClick={showObj.bind(this, "Login")} className="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                    <img src="../static/frontend/restaurant3_template_files/img_avatar.png" alt="Avatar" style={{width: "30%"}} className="w3-circle w3-margin-top"/>
                  </div>

                  <pre className="w3-center" id="LoginErrors" style={{color: "red"}}><br/>
                  </pre>

                 <div className="w3-bar-item w3-large w3-padding" style={{cursor: "default"}} id="LoginButton">
                      <form method="post" action="/restaurant/login">
                        Username: <input className="w3-input w3-border w3-margin-right" id="id_username" type="text" name="username" autoFocus="" required=""/><br/>
                        Password: <input id="id_password" type="password" className="w3-input w3-border" name="password" autoFocus="" required=""/><br/>
                        <input type="hidden" name="next" value="/restaurant/" />
                        <input type="hidden" name="csrfmiddlewaretoken" value={ Cookies.get('csrftoken')} />
                        <input type="submit" className="w3-button" value="login" />
                      </form>
                 </div>

                </div>
            </div>
        </div>
    )
  }
}

export default Login;

const container = document.getElementById("LoginModal");
render(<Login/>, container);

