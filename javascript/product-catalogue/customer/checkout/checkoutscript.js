let data = localStorage.getItem("productarr");
let productarr = JSON.parse(data);

data = localStorage.getItem("purchasedarr");
let purchasedarr = JSON.parse(data);

let bill = document.getElementById("bill");
var pay = document.getElementById("pay");

for(let i=0;i<purchasedarr.length;i++)
    {
        addtodom(purchasedarr[i]);
    }
getthebill = document.createElement("button");
getthebill.innerHTML = "Get me the bill";
bill.appendChild(getthebill);

getthebill.addEventListener("click",function(){
    bill.style.display = "none";
    createbill();
    updatethestock();
    emptypurchasedarr();
});
function emptypurchasedarr()
{
    purchasedarr = [];
    let x = JSON.stringify(purchasedarr);
    localStorage.setItem("purchasedarr",x);
}
function updatethestock()
{
   for(let i=0;i<purchasedarr.length;i++)
       {
            for(let j=0;j<productarr.length;j++)
                {
                    if(purchasedarr[i].pid == productarr[j].pid)
                        {
                            productarr[j].quantity = parseInt(productarr[j].quantity) - purchasedarr[i].quantity;
                        }
                }
       }
    let x = JSON.stringify(productarr);
    localStorage.setItem("productarr",x);
}

function createbill()
{
    let p = document.createElement("p");
    p.setAttribute("id","payment");
    let sum = 0;
    for(let i=0;i<purchasedarr.length;i++)
        {
            p.innerHTML += purchasedarr[i].name + " => " + purchasedarr[i].quantity + " x " + purchasedarr[i].price + "=" + purchasedarr[i].quantity*parseInt(purchasedarr[i].price) +"<br>" ;
            sum += purchasedarr[i].quantity*parseInt(purchasedarr[i].price);
        }
    pay.appendChild(p);
    let total = document.createElement("p");
    total.innerHTML = "Your total bill is : " + sum + " rupees";
    pay.appendChild(total);
}

function addtodom(product)
{
    let newdiv = document.createElement("div");
    newdiv.setAttribute('id',product.pid);
    
    let a = document.createElement("p");
    a.innerHTML = product.name + "<br>" + product.price + "<br>" + product.quantity;
    newdiv.appendChild(a);
    
    let plus = document.createElement("button");
    plus.innerHTML = "+";
    newdiv.appendChild(plus);
    
    plus.addEventListener("click",function(event){
        let parent = event.target.parentNode;
        let index = getindex(parent);
        console.log(index);
        inc(index);
        changeindom(index);
    })
    
    let minus = document.createElement("button");
    minus.innerHTML = "-";
    newdiv.appendChild(minus);
    minus.addEventListener("click",function(event){
        let parent = event.target.parentNode;
        let index = getindex(parent);
        console.log(index);
        dec(index);
        changeindom(index);
    })
    
    bill.appendChild(newdiv);
}

function getindex(parent)
{
    for(let i=0;i<purchasedarr.length;i++)
        {
            if(purchasedarr[i].pid == parent.id)
                return i;
        }
}

function inc(index)
{
    if(purchasedarr[index].quantity + 1 <= stock(index))//this is the index of the product that is in customer cart
    purchasedarr[index].quantity++;
    
    if(purchasedarr[index].quantity == stock(index))
        {
            alert('sale ambani ki aulad hai kya ');
        }
    
    let data = JSON.stringify(purchasedarr);
    localStorage.setItem("purchasedarr",data);
}
function stock(index)
{
    let pid = purchasedarr[index].pid;
    for(let i=0;i<productarr.length;i++)
        {
            if(pid == productarr[i].pid)
                return parseInt(productarr[i].quantity);
        }
}
function dec(index)
{
    if(purchasedarr[index].quantity - 1 >= 0)
    purchasedarr[index].quantity--;
    
    if(purchasedarr[index].quantity == 0)
        {
            alert('please dont waste our time and resources');
        }
    
    let data = JSON.stringify(purchasedarr);
    localStorage.setItem("purchasedarr",data);
}
function changeindom(index)
{
    document.getElementById(purchasedarr[index].pid).childNodes[0].innerHTML = purchasedarr[index].name + "<br>" + purchasedarr[index].price + "<br>" + purchasedarr[index].quantity ;
}