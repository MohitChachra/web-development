var options = {
  strings: ["aaj ka kaam", "ohh sorry guys my mistake","My todo list"],
  typeSpeed: 50
}

var typed = new Typed("h1", options);



var add=document.getElementById("add");
var removeall=document.getElementById("removeall");
var list = document.getElementById("list");

//remove all button

removeall.onclick = function(){
    list.innerHTML = "" ;
}

//adding a new element

add.onclick = function(){
    addlis(list);
    document.getElementById('userinput').value = "";
    document.getElementById('userinput').focus();
}

function addlis(targetUl){
    var inputText = document.getElementById("userinput").value;
    var li = document.createElement('li');
    var textNode = document.createTextNode( inputText + ' ');
    var removebutton = document.createElement('button');
    
    if(inputText !== '')
        {
            removebutton.className = "btn btn-xs btn-danger";
            removebutton.innerHTML = "&times; ";
            removebutton.setAttribute('onclick','removeMe(this)');
            
            li.appendChild(textNode);
            li.appendChild(removebutton);
            targetUl.appendChild(li);
        }
    else{
        alert("please enter a todo");
    }
}

function removeMe(item){
    var p = item.parentElement;
    p.parentElement.removeChild(p);
}
