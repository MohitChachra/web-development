let data = localStorage.getItem("productarr");
let productarr = JSON.parse(data);
var showproductbtn = document.getElementById("start");
var availableproducts = document.getElementById("availableproducts");
var checkoutbtn = document.getElementById("checkout");
var cart = document.getElementById("cart");

var purchasedarr = new Array();
var purchased = 0;

var countfrompurchasedarr = localStorage.getItem("purchasedarr");
var purchasedarr = JSON.parse(countfrompurchasedarr);

checkoutbtn.addEventListener("click",function(){
    if(purchasedarr == null || purchasedarr.length == 0)
        {
            alert('cart is empty please add someitems');
        }
    else
        {
            for(let i=0;i<purchasedarr.length;i++)
                {
                    for(let j=i+1;j<purchasedarr.length;j++)
                        {
                            if(purchasedarr[i].pid == purchasedarr[j].pid)
                                {
                                    purchasedarr[i].quantity++;
                                    purchasedarr.splice(j,1);
                                }
                        }
                }
        }
    let da = JSON.stringify(purchasedarr);
    localStorage.setItem("purchasedarr",da);
})

if(purchasedarr == 0 || purchasedarr == null || purchasedarr == undefined)
    {
        
    }
else
    {
        let sum = 0;
        for(var i=0;i<purchasedarr.length;i++)
            {
                sum += purchasedarr[i].quantity;
            }
        cart.innerHTML = sum;
        purchased = sum;
    }


showproductbtn.addEventListener("click",showproducts);

function showproducts()
{
    if(productarr == null || productarr.length == 0)
    {
        alert("all products are out of stock");
    }
    else
    {
        for(var i=0;i<productarr.length;i++)
            {
                if(productarr[i].quantity != 0)
                    {
                        addtodom(productarr[i]);
                    }
            }
        cart.style.display = "inline-block"
        checkoutbtn.style.display = "inline-block";
        showproductbtn.style.display = "none";
    }
}

function addtodom(product)
{
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id",product.pid);
    
    var a = document.createElement("p");
    a.innerHTML = "<b>Product : </b>" + product.name;
    newdiv.appendChild(a);
    
    var b = document.createElement("p");
    b.innerHTML = "<b>Price : </b>" + product.price;
    newdiv.appendChild(b);
    
    var c = document.createElement("p");
    c.innerHTML = "<b>about product : </b>" + product.desc;
    newdiv.appendChild(c);
    
    var buynow = document.createElement("button");
    buynow.innerHTML = "Buy Now";
    newdiv.appendChild(buynow);
    
    buynow.addEventListener("click",function(event){
       let index =  getindex(event.target.parentNode);
       if(parseInt(productarr[index].quantity) > 0)
           {
               updatetocart(index);
               addtopurchasedarr(index);
           }
        else
            {
                alert("not available");
            }
    });
    
    availableproducts.appendChild(newdiv);
}
function updatetocart(index)
{
    purchased++;
    cart.innerHTML = purchased;
}
function getindex(parent)
{
    for(var i=0;i<productarr.length;i++)
        {
            if(productarr[i].pid == parent.id)
                {
                   return i;
                }
        }
}
function addtopurchasedarr(index)
{
    let newproduct = new Object();
    newproduct.name = productarr[index].name;
    newproduct.price = productarr[index].price;
    newproduct.quantity = 1;
    newproduct.pid = productarr[index].pid;
    purchasedarr.push(newproduct);
    var purchaseddata = JSON.stringify(purchasedarr);
    localStorage.setItem("purchasedarr",purchaseddata);
}