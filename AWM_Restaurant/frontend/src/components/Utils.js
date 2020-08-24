export function changeSelectedObj(id, name){

    {/* If true renders the button green */}
    var green = true

    var old_selected_obj = document.getElementsByName("selected_"+name);
    if (old_selected_obj.length != 0)
    {
        if (old_selected_obj[0].id == id)
        {
            green = false
        }
        old_selected_obj[0].className = old_selected_obj[0].className.replace("fas", "far");
        old_selected_obj[0].style = "cursor: pointer;";
        old_selected_obj[0].setAttribute("title", "Click to select this"+name+" for your order.");
        old_selected_obj[0].setAttribute("name","unselected"+name);
    }

    var selected_obj = document.getElementById(id);
    if (selected_obj.className.indexOf("fas") == -1 && green)
    {
      // far=non selezionato; fas=selezionato
      selected_obj.className = selected_obj.className.replace("far", "fas");
      selected_obj.style = "cursor: pointer; color: green;";
      selected_obj.setAttribute("title", "Click to deselect this "+name)
      selected_obj.setAttribute("name","selected_"+name);
    }
}

export function ObjSelection(id, name){
    // far non trovato; far=non selezionato; fas=selezionato
    var x = document.getElementById(id);
    if (x.className.indexOf("far") == -1) {
      x.className = x.className.replace("fas", "far");
      x.style = "cursor: pointer;";
      x.setAttribute("name","unselected_"+name);
      x.setAttribute("title", "Click to select this"+name+"for your order.");
    } else {
      x.className = x.className.replace("far", "fas");
      x.style = "cursor: pointer; color: green;";
      x.setAttribute("name","selected_"+name);
      x.setAttribute("title", "Click to delete this"+name+"from your order.")
    }
}

export function ChangeObjValue(id, new_value) {
        var selected_obj = document.getElementById(id);
        selected_obj.setAttribute("value", new_value)
}
