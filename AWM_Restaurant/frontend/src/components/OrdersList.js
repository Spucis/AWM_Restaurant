import React, { Component } from "react";
import { render } from "react-dom";

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      loaded: false,
      placeholder: "Loading"
    };
    this.send_delete_order = this.send_delete_order.bind(this)
    this.send_delete_plates = this.send_delete_plates.bind(this)
    this.onClick_delete_plates = this.onClick_delete_plates.bind(this)
    this.checkButton_updateDeleteOrder = this.checkButton_updateDeleteOrder.bind(this)
    this.send_PUT = this.send_PUT.bind(this)
    this.close_all_deleteUpdateOrder = this.close_all_deleteUpdateOrder.bind(this)
  }

  componentDidMount() {
    fetch("orders")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { data: {'orders': "" }, error: response.status, placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        return this.setState(() => {
           if(data){
                return {
                    data: data['orders'],
                    loaded: true
                }
          }
        });
      });

    /*
    const csrftoken = Cookies.get('csrftoken');
    var json_obj = JSON.stringify({"order_id": order_id});

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            var resp = JSON.parse(xhr.response)
            if(xhr.status === 200)
            {
                console.log("Order "+order_id+" deleted.")
            }
            else
            {
                console.log("Error while trying to delete order "+order_id+".")
            }
        }
    }

    xhr.open("GET", "/restaurant/orders", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(json_obj);
      */
  }

  send_delete_order(order_id){
    const csrftoken = Cookies.get('csrftoken');
    var json_obj = JSON.stringify({"order_id": order_id});

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            var resp = JSON.parse(xhr.response)
            if(xhr.status === 200)
            {
                console.log("Order "+order_id+" deleted.")
            }
            else
            {
                console.log("Error while trying to delete order "+order_id+".")
            }
        }
    }

    xhr.open("DELETE", "/restaurant/order", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(json_obj);
    document.getElementById("refreshOrders").click()
  }

  send_PUT(obj){
   const csrftoken = Cookies.get('csrftoken');
    var json_obj = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            if(xhr.status === 200){
                var resp = JSON.parse(xhr.response);
            }
            else
            {
                console.warn("Error while updating the order")
            }
        }
    }

    xhr.open("PUT", "/restaurant/order", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(json_obj);
    this.close_all_deleteUpdateOrder(obj["order_id"])
    document.getElementById("refreshOrders").click()
  }

  close_all_deleteUpdateOrder(order_id){
    var curr_order_data = {}
    for (var order_idx in this.state.data){
        if (this.state.data[order_idx].id == order_id){
            curr_order_data = this.state.data[order_idx]
            break
        }
    }

    for (var plate_idx in curr_order_data.plates){
        var curr_delete_button = document.getElementById(order_id+"_"+curr_order_data.plates[plate_idx]+"_qty_delete_cancel")
        curr_delete_button.click();
    }
  }

  send_delete_plates(order_id){

    var curr_order_data = {}
    var plates = {} //dizionario plates da inviare al server
    for (var order_idx in this.state.data){
        if (this.state.data[order_idx].id == order_id){
            curr_order_data = this.state.data[order_idx]
            break
        }
    }

    for (var plate_idx in curr_order_data.plates){
        var curr_qty_to_delete = parseInt(document.getElementById(order_id+"_"+curr_order_data.plates[plate_idx]+"_qty_to_delete").innerHTML)
        // se non è minore di 0 c'è un problema
        if (curr_qty_to_delete < 0){
            plates[curr_order_data.plates[plate_idx]] = curr_qty_to_delete;
        }
    }

    this.send_PUT({"order_id": order_id, "plates": plates})
  }

  onClick_delete_plates(plate_id, qty_delete){

    // the button is the cross: swap to down-arrow and from this moment start to count the plates to delete.

    if (document.getElementById(plate_id+'_deletePlates').getAttribute('class') === "fas fa-times-circle w3-margin-left w3-right"){

        document.getElementById(plate_id+"_qty_to_delete").style="display: block;";
        document.getElementById(plate_id+"_qty_to_delete").innerHTML = 0;
        document.getElementById(plate_id+"_to_delete_block_arrow").style="display: block; color: red;";
        document.getElementById(plate_id+"_qty_delete_cancel").setAttribute("style","display: block; cursor: pointer; color: red;");
        document.getElementById(plate_id+'_deletePlates').setAttribute('class', "fas fa-arrow-circle-down w3-margin-left w3-right");
        document.getElementById(plate_id+"_qty_delete_arrow_up").style="display: block;color: red; cursor: pointer;";
    }
    else
    {
        if(document.getElementById(plate_id+"_qty").innerHTML <= -(document.getElementById(plate_id+"_qty_to_delete").innerHTML)){
            document.getElementById(plate_id+"_qty_to_delete").innerHTML = -(document.getElementById(plate_id+"_qty").innerHTML);
        }
        else
        {
            document.getElementById(plate_id+"_qty_to_delete").innerHTML -= 1;
        }
    }
    // enable the "delete plates" button
    document.getElementById(plate_id.split("_")[0]+"_updateDeleteOrder").setAttribute("style", "display: block;");
  }

  checkButton_updateDeleteOrder(order_id)
  {
    var curr_order_data = {}
    for (var order_idx in this.state.data){
        if (this.state.data[order_idx].id == order_id){
            curr_order_data = this.state.data[order_idx]
            break
        }
    }

    var found = false
    for (var plate_idx in curr_order_data.plates){
        var curr_delete_button = document.getElementById(order_id+"_"+curr_order_data.plates[plate_idx]+"_qty_delete_cancel")
        // found at least one cancel button that is still active
        if (window.getComputedStyle(curr_delete_button).display === "block") {
            found = true
            break
        }
    }
    // no cancel icons found: disable the "delete plates" button
    if (found===false)
    {
        document.getElementById(order_id+"_updateDeleteOrder").setAttribute("style", "display: none;")
    }

  }
  render() {
    if(this.state.error === "")
    {
        return (
        <div>
            <ul>
                <button
                    id="refreshOrders"
                    onClick={this.componentDidMount.bind(this)}
                    className="w3-button w3-center"
                >
                Refresh Your Orders!
                </button>
            </ul>
            Available orders:
            <ul className="w3-ul w3-border">
            {this.state.data.map(order => {
              return (
                <li key={order.id} className="w3-row w3-xlarge w3-display-container w3-margin-top" >
                  <span className="w3-left w3-margin-right">Order <span className="w3-text-amber">{order.id}</span></span>
                  <span className="w3-left w3-margin-left">Date: <span className="w3-text-amber">{ order.date.split('T')[0]//+' '+
                                                    /*order.date.split('T')[1].slice(0,-1)*/}</span></span>
                  <span className="w3-display-topmiddle">CODE:
                    <span
                        className="w3-xxlarge w3-text-amber w3-border w3-border-amber w3-margin-left"
                        id={order.id+"_password"}
                        > {order.password}
                    </span>
                  </span>
                  <span className="w3-right far fa-times-circle"
                        id={order.id+'_deleteOrder'}
                        title="Delete order!"
                        style={{color: 'red'}}
                        onMouseEnter={(element) => {document.getElementById(element.target.id).setAttribute('class', "w3-right fas fa-times-circle");
                                                    document.getElementById(element.target.id).setAttribute('style', "color: red; cursor: pointer;");
                                                    }}
                        onMouseLeave={(element) => {document.getElementById(element.target.id).setAttribute('class', "w3-right far fa-times-circle w3-margin-left");
                                                    document.getElementById(element.target.id).setAttribute('style', "color: red;");
                                                   }}
                        onClick={() => this.send_delete_order(order.id)}
                        >
                  </span>
                  <ul className="w3-row">
                  Table <span className="w3-text-amber w3-margin-right">{order.table}</span> |
                  <span className="w3-margin-left">Waiter:</span> <span className="w3-text-amber">{order.waiter.username}</span>
                  <ul className="w3-ul">
                  {order.pds.map(pd => {
                    return (
                    <li key={pd.id} className="w3-row w3-hover-gray">
                    <span className="w3-left">Plate: <span className="w3-text-amber" style={{textShadow:'1px 1px 0 #444'}}>{pd.plate.name}</span></span>
                    <span className="w3-left w3-margin-left">Unit price: <span className="w3-text-amber" style={{textShadow:'1px 1px 0 #444'}} >${pd.plate.price}</span></span>
                    <span className="w3-left w3-margin-left w3-container"><span className="w3-left">Qt.:</span> <span id={ order.id+"_"+pd.plate.code+"_qty" }
                                                                        className="w3-text-amber w3-left w3-margin-right"
                                                                        style={{textShadow:'1px 1px 0 #444'}}
                                                                        >
                                                                        {pd.quantity}
                                                                  </span>
                                                                  <span
                                                                        id={order.id+"_"+pd.plate.code+"_to_delete_block_arrow"}
                                                                        className="fas fa-arrow-right w3-left"
                                                                        style={{color: 'red', display: 'none'}}>
                                                                  </span>
                                                                  <span id={order.id+"_"+pd.plate.code+"_qty_to_delete"}
                                                                        className="w3-margin-left w3-text-red w3-left"
                                                                        style={{display: 'none'}}
                                                                        >
                                                                        0
                                                                  </span>
                    </span>
                    <span
                        id={ order.id+"_"+pd.plate.code+'_deletePlates' }
                        className="far fa-times-circle w3-right"
                        title="Delete plates from this order"
                        style={{ color: 'red' }}
                        onMouseEnter={(element) => {
                                                      if(document.getElementById(element.target.id).getAttribute("class").includes("arrow"))
                                                        {
                                                          document.getElementById(element.target.id).setAttribute('class', "fas fa-arrow-circle-down w3-margin-left w3-right");
                                                          document.getElementById(element.target.id).setAttribute('style', "color: red; cursor: pointer;");
                                                        }
                                                        else
                                                        {
                                                          document.getElementById(element.target.id).setAttribute('class', "fas fa-times-circle w3-margin-left w3-right");
                                                          document.getElementById(element.target.id).setAttribute('style', "color: red; cursor: pointer;");
                                                        }
                                                   }}
                        onMouseLeave={(element) => {
                                                        if(document.getElementById(element.target.id).getAttribute("class").includes("arrow"))
                                                        {
                                                          document.getElementById(element.target.id).setAttribute('class', "fas fa-arrow-circle-down w3-margin-left w3-right");
                                                          document.getElementById(element.target.id).setAttribute('style', "color: red;");
                                                        }
                                                        else
                                                        {
                                                          document.getElementById(element.target.id).setAttribute('class', "far fa-times-circle w3-margin-left w3-right");
                                                          document.getElementById(element.target.id).setAttribute('style', "color: red;");
                                                        }
                                                    }}
                        onClick={(element) => this.onClick_delete_plates(element.target.id.slice(0, -("_deletePlates".length)))}
                        >
                    </span>
                    <span
                        id={order.id+"_"+pd.plate.code+"_qty_delete_arrow_up"}
                        className="fas fa-arrow-circle-up w3-right"
                        style={{display: 'none', color: 'red', cursor: 'pointer'}}
                        onMouseEnter={(element) => {
                                                        document.getElementById(element.target.id).setAttribute("style", "display: block; color: red; cursor: pointer;")
                                                    }}
                        onMouseLeave={() => {}}
                        onClick={(element) => {
                                                var plate_id = element.target.id.slice(0, -("_qty_delete_arrow_up".length))
                                                if(0 <= (document.getElementById(plate_id+"_qty_to_delete").innerHTML)){
                                                    document.getElementById(plate_id+"_qty_to_delete").innerHTML = 0;
                                                }
                                                else
                                                {
                                                    document.getElementById(plate_id+"_qty_to_delete").innerHTML =
                                                        parseInt(document.getElementById(plate_id+"_qty_to_delete").innerHTML) + 1;
                                                }
                                              }}
                    >
                    </span>
                    <span id={order.id+"_"+pd.plate.code+"_qty_delete_cancel"}
                          className="fas fa-undo w3-right"
                          title="Cancel"
                          style={{display: 'none', color:"red", cursor: 'pointer'}}
                          onClick={(element) => {

                                    var plate_code = element.target.id.slice(0, -("_qty_delete_cancel".length));
                                    document.getElementById(plate_code+"_qty_to_delete").style="display: none;";
                                    document.getElementById(plate_code+"_qty_to_delete").innerHTML = 0;
                                    document.getElementById(plate_code+"_to_delete_block_arrow").style="display: none;";
                                    document.getElementById(plate_code+"_qty_delete_cancel").style="display: none;";
                                    document.getElementById(plate_code+'_deletePlates').setAttribute('class', "far fa-times-circle w3-margin-left w3-right");
                                    document.getElementById(plate_code+"_qty_delete_arrow_up").style="display: none;";
                                    console.log(parseInt(element.target.id.split("_")[0]))
                                    // parse the order_id as integer and pass it to the function
                                    this.checkButton_updateDeleteOrder(parseInt(element.target.id.split("_")[0]))
                                    }}
                          >
                    </span>

                    </li>
                    );
                  })}
                  </ul>
                  </ul>
                  <button
                    id={order.id+"_updateDeleteOrder"}
                    onClick={() => {this.send_delete_plates(order.id)}}
                    className="w3-button w3-right"
                    style={{display: 'none'}}
                  >
                  Delete plates!
                  </button>
                </li>
              );
            })}
            </ul>
        </div>
        );
    }
    else if(this.state.error == 403)
    {
            return(
        <div>
            You are not logged in!
        </div>
        )
    }
  }
}

export default OrdersList;
