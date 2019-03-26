let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit");
let data = localStorage.getItem("validation");
let info = JSON.parse(data);

submit.addEventListener('click',function(){
    validate();
})


function validate()
{
    if(info == null || info == undefined)
        {
            alert('no such account exist');
        }
    else
        {
            let count = 0;
            for(let i=0;i<info.length;i++)
            {
                if(username.value == info[i].username && password.value == info[i].password)
                    document.getElementById("submitlink").setAttribute("href","../customer.html")   ;
                else
                    count++;
            }
            if(count == info.length)
            {
                alert('no such account exist');
            }
        }
}