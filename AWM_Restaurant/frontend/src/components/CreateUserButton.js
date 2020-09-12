import React, { Component } from "react";
import { render } from "react-dom";

class CreateUserButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      loaded: false,
      placeholder: "Loading",
    };
  }

  sendPOST(){
        // Retrieve Data for POST
        var userInput = document.getElementById("sign_username");
        var psw1Input = document.getElementById("sign_password1");
        var psw2Input = document.getElementById("sign_password2");

        const csrftoken = Cookies.get('csrftoken');

        var obj = {
                    'csrfmiddlewaretoken': csrftoken,
                    "username": userInput.value,
                    "password1": psw1Input.value,
                    "password2": psw2Input.value,
                    "group": "clients"
                  };
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === 4)
			{
			    if(xhr.status === 200)
			    {
                    location.reload()
			    }

			    if(xhr.status === 422)
			    {

                    var info = ""
			        var resp = JSON.parse(xhr.response);

                    console.log(resp)

                    var container = document.getElementById("SignUpErrors");

                    for(var key in resp)
                        if(resp.hasOwnProperty(key))
                            info += key+": "+resp[key][0].message+"\n"
                            var container = document.getElementById("SignUpErrors");

                    render(info, container);

			    }
			}
		}

		xhr.open("POST", "/restaurant/createUser", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

  render() {
    return(
        <button
            id="btnCreateUser"
            onClick={this.sendPOST.bind(this)}
            className="w3-button w3-border"
        >
            Create User
        </button>
    );
  }
}

export default CreateUserButton;
