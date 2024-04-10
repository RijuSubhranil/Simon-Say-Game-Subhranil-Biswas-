let gameSeq=[];
let userSeq=[];
// let highestscore=0;
let btns=["yellow","red","blue","green"];

let started=false;
let level=0;

let h3=document.querySelector("h3");

//starting game
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
});

//button flash
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    // if(level>highestscore){
    //     highestscore=level;
        
    // }
    h3.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    calculateHighestScore(level);
}

// function updateHighestScore()
// {
//     h3.innerText = `Highest Score: ${highestscore}`;
// }
function checkAns(idx){
    if(gameSeq[idx]===userSeq[idx]){
       if(userSeq.length===gameSeq.length){
        setTimeout(levelUp,1000);
       }
    }
    else{
        h3.innerHTML=`Game Over!! <b>Your Score: ${level}<b><br>Press any key to continue`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}
//button event listener  controlled by user
function btnPress(){
    
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
//restarting game after getting over
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

let highestscore=0;
function calculateHighestScore(score){
    highestscore=Math.max(highestscore,score); 
    updateHighestScore();
}

function updateHighestScore() {
    h3.innerText = `Level ${level} \n Highest Score: ${highestscore}`;

}