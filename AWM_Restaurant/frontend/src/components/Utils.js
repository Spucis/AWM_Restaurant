export function changeSelectedObj(id, sel_name){

    {/* If true renders the button green */}
    var green = true

    var old_selected_obj = document.getElementsByName(sel_name);
    if (old_selected_obj.length != 0)
    {
        if (old_selected_obj[0].id == id)
        {
            green = false
        }
        old_selected_obj[0].className = old_selected_obj[0].className.replace("fas", "far");
        old_selected_obj[0].style = "cursor: pointer;";
        old_selected_obj[0].setAttribute("title", "Click to select this waiter for your order.");
        old_selected_obj[0].setAttribute("name","un"+sel_name);
    }

    var selected_obj = document.getElementById(id);
    if (selected_obj.className.indexOf("fas") == -1 && green)
    {
      // far=non selezionato; fas=selezionato
      selected_obj.className = selected_obj.className.replace("far", "fas");
      selected_obj.style = "cursor: pointer; color: green;";
      selected_obj.setAttribute("title", "Click to deselect this table.")
      selected_obj.setAttribute("name",sel_name);
    }
}

{/* Unselect obj*/}
