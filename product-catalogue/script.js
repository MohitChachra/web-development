//getting dom elements from html
var addproductform = document.getElementById("addproductform");
var addproduct = document.getElementById("addproduct");
var nameq = document.getElementById("name");
var price = document.getElementById("price");
var desc = document.getElementById("desc");
var quantity = document.getElementById("quantity");
var addtolist = document.getElementById("add");
var listofproducts = document.getElementById("listofproducts");

var editproductform = document.getElementById("editproductform");
    
//product array which will hold all the products added by the shopkeeper    
var productarr = new Array();
var productid = 1;
let arrid = -1;

//to open my product addition form
addproduct.addEventListener("click",function(){
    addproductform.style.display = "block";
    addproduct.style.display = "none";
});

//for throwing query
addtolist.addEventListener("click",function(){
    var obj = addtoproductarr();
    addtodom(obj);
    addproductform.style.display = "none";
    addproduct.style.display = "block";
});

function addtoproductarr()
{
    var newproduct = new Object();
    newproduct.name = nameq.value;
    newproduct.price = price.value;
    newproduct.desc = desc.value;
    newproduct.quantity = quantity.value;
    newproduct.pid = productid;
    
    nameq.value = "";
    price.value = "";
    desc.value = "";
    quantity.value = "";
    productid++;
    
    productarr.push(newproduct);
    
    return newproduct;
}

function addtodom(obj)
{
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id",obj.pid);
    
    var pname = document.createElement("p");
    pname.innerHTML = obj.name;
    newdiv.appendChild(pname);
    
    var pprice = document.createElement("p");
    pprice.innerHTML = obj.price;
    newdiv.appendChild(pprice);
    
    var pdesc = document.createElement("p");
    pdesc.innerHTML = obj.desc;
    newdiv.appendChild(pdesc);
    
    var pquantity = document.createElement("p");
    pquantity.innerHTML = obj.quantity;
    newdiv.appendChild(pquantity);
    
    var deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete product";
    newdiv.appendChild(deletebtn);
    
    deletebtn.addEventListener("click",function(event){
        parent = event.target.parentNode;
        var arrid = getarrindex(parseInt(parent.id));
        deletefromarr(arrid);
        deletefromdom(parent);
    })
    
    var editbtn = document.createElement("button");
    editbtn.innerHTML = "edit product";
    newdiv.appendChild(editbtn);
    
    editbtn.addEventListener("click",function(event){
        var parent = event.target.parentNode;
        arrid = getarrindex(parseInt(parent.id));
        openeditform(arrid);
        addproduct.style.display = "none";
    })
    
    newdiv.className = "newdiv";
    document.getElementById("listofproducts").appendChild(newdiv);
}

function openeditform(id)
{
    editproductform.style.display = "block";
    document.getElementById("ename").value = productarr[id].name;
    document.getElementById("eprice").value = productarr[id].price;
    document.getElementById("edesc").value = productarr[id].desc;
    document.getElementById("equantity").value = productarr[id].quantity;
}

document.getElementById("eadd").onclick = function()
{
    productarr[arrid].name = document.getElementById("ename").value;
    productarr[arrid].price = document.getElementById("eprice").value;
    productarr[arrid].desc = document.getElementById("edesc").value;
    productarr[arrid].quantity = document.getElementById("equantity").value;
    
    changeindom(productarr[arrid].pid,productarr[arrid]);
    
    editproductform.style.display = "none";
    addproduct.style.display = "block";
}

function changeindom(id,obj)
{
    var a = document.getElementById(id);
    var child = a.childNodes;
    
    child[0].innerHTML = obj.name;
    child[1].innerHTML = obj.price;
    child[2].innerHTML = obj.desc;
    child[3].innerHTML = obj.quantity;
}



function getarrindex(id)
{
    for(var i=0;i<productarr.length;i++)
        {
            if(productarr[i].pid == id)
                return i;
        }
}

function deletefromarr(id)
{
    productarr.splice(id,1);
}

function deletefromdom(division)
{
    division.parentNode.removeChild(division);
}