/*
                           MOJ LO ROJ LO NA MILE TO KHOJ LO

                      \/                    __/   .::::.-'-(/-/)
                             _/:  .::::.-' .-'\/\_`*******          __ (_))
                \/          /:  .::::./   -._-.  d\|               (_))_(__))
                             /: (""""/    '.  (__/||           (_))__(_))--(__))
                              \::).-'  -._  \/ \\/\|
                      __ _ .-'`)/  '-'. . '. |  (i_O
                  .-'      \       -'      '\|
             _ _./      .-'|       '.  (    \\                         % % %
          .-'   :      '_  \         '-'\  /|/      @ @ @             % % % %
         /      )\_      '- )_________.-|_/^\      @ @ @@@           % %\/% %
         (   .-'   )-._-:  /        \(/\'-._ `.     @|@@@@            ..|........
          (   )  _//_/|:  /          `\()   `\_\     |/_@@             )'-._.-._.-
           ( (   \()^_/)_/             )/      \\    /                /   /
            )  _.-\\.\(_)__._.-'-.-'-.//_.-'-.-.)\-'/._              /
        .-.-.-'   _o\ \\\     '::'   (o_ '-.-' |__\'-.-;~ ~ ~ ~ ~ ~~/   /\
                  \ /  \\\__          )_\    .:::::::.-'\          '- - -|
             :::''':::::^)__\:::::::::::::::::'''''''-.  \                '- - -
            :::::::  '''''''''''   ''''''''''''':::. -'\  \
        _____':::::_____________________________________\__\______________________
        
        
*/

function timer(){
	    var time,id;
    var flag;
    
    var dom = {
        startbtn : '.start',
        resetbtn : '.reset',
        inputtime : '#getinput',
        counter : '.count',
        contbtn: '.cont',
    }
    
    var setupeventlistener = function(){
        document.querySelector(dom.startbtn).addEventListener("click",function(){
            if(flag == 0)
                {
                    time = document.querySelector(dom.inputtime).value;
                    if(time != "")
                        {
                            document.querySelector(dom.contbtn).style.display = 'inline';
                            document.querySelector(dom.resetbtn).style.display = 'inline';
                            starttimer();
                            flag++;
                        }
                }
            else
                {
                    document.querySelector(dom.contbtn).style.display = 'inline';
                    starttimer();
                }
            
        });
        
        document.querySelector(dom.resetbtn).addEventListener('click',function(){
            resettime();
            
        });
        
        document.querySelector(dom.contbtn).addEventListener('click',function(){
            pausetheclock();
        })
        
    };
    
    function pausetheclock(){
        clearInterval(id);
        document.querySelector(dom.startbtn).style.display = 'inline';
        document.querySelector(dom.contbtn).style.display = 'none';
    }
    
    function resettime(){
        flag = 0;
        document.querySelector(dom.counter).textContent = 0;
        document.querySelector(dom.startbtn).style.display = "inline";
        document.querySelector(dom.contbtn).style.display = 'none';
        document.querySelector(dom.resetbtn).style.display = 'none';
        document.querySelector(dom.inputtime).style.display = "inline";
        clearInterval(id);
    }
    
    var starttimer = function(){
      document.querySelector(dom.inputtime).value = "";
      document.querySelector(dom.startbtn).style.display = "none";
      document.querySelector(dom.inputtime).style.display = "none";
      updateview(time);
      id = setInterval(startcounting,1000);
    }
    
    function updateview(time){
        document.querySelector(dom.counter).textContent = time;
    }
    
    function startcounting(){
        time--;
        updateview(time);
        if(time == 0)
            {
                resettime();
                alert('time up');
            }
    }
    //return to communicate with the world
    return{
        init : function(){
            setupeventlistener();
            flag = 0;
        }
    }
}

var mytimer = timer();
mytimer.init();
