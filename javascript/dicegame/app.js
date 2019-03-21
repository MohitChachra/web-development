var globalScore = [0,0];
var currentScore = 0;
var turn = 0;
var gameover = false;
start();

function start()
{
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.getElementById("score-0").textContent = globalScore[0];
    document.getElementById("score-1").textContent = globalScore[1];
    document.getElementById("current-0").textContent = currentScore;
    document.getElementById("current-1").textContent = currentScore;
}

document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gameover == false)
        {
            var dice1 = Math.floor(Math.random()*6) + 1;
            var dice2 = Math.floor(Math.random()*6) + 1;
    
        if(dice1 === 1 || dice2 === 1)
            {
                nextPlayer();
            }
            else
            {
                var img1 = "dice-"+dice1+".png";
                var img2 = "dice-"+dice2+".png";
                document.getElementById("dice-1").src = img1;
                document.getElementById("dice-2").src = img2;
    
                document.getElementById("dice-1").style.display = "block";
                document.getElementById("dice-2").style.display = "block";
    
                currentScore+=dice1+dice2;
                document.getElementById("current-"+turn).textContent = currentScore;
            }
        }
});

function nextPlayer()
{
    document.querySelector(".player-"+turn+"-panel").classList.remove("active");
        
    turn = turn === 1?0:1;
    
    document.querySelector(".player-"+turn+"-panel").classList.add("active");
    
    currentScore = 0;
    
    document.getElementById("current-0").textContent = currentScore;
    document.getElementById("current-1").textContent = currentScore;
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click",function(){
   if(gameover == false)
       {
            globalScore[turn]+=currentScore;
    
    document.getElementById("score-"+turn).textContent = globalScore[turn];
        
    if(globalScore[0] >= 10 || globalScore[1] >= 10)
        {
            document.querySelector('#name-' + turn).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + turn + '-panel').classList.add('winner');
            document.querySelector('.player-' + turn + '-panel').classList.remove('active');
            gameover = true;
        }
    
    else
        {     
            nextPlayer();
            start();
        }
       }
})

document.querySelector(".btn-new").addEventListener("click",function(){
    console.log(turn);
    document.querySelector('.player-' + turn + '-panel').classList.remove('winner');
    
    document.querySelector(".player-"+turn+"-panel").classList.remove("active");
    
    document.querySelector(".player-"+0+"-panel").classList.add("active");
    
    document.querySelector('#name-' + 0).textContent = 'Player 0';
    document.querySelector('#name-' + 1).textContent = 'Player 1';
    
    globalScore = [0,0];
    currentScore = 0;
    turn = 0;
    gameover = false;
    
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.getElementById("score-0").textContent = globalScore[0];
    document.getElementById("score-1").textContent = globalScore[1];
    document.getElementById("current-0").textContent = currentScore;
    document.getElementById("current-1").textContent = currentScore;
    
})