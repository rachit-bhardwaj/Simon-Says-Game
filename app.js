let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'red', 'skyblue', 'green'];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector('h2')
let h3 = document.querySelector('h3')


document.addEventListener('keypress', () =>{
    if (started == false){
        console.log("Game is Stated");  
        started = true;
        levelUp();
    }
})

function gameflash(btn){
btn.classList.add('flash');
setTimeout(function (){
    btn.classList.remove('flash')
}, 100);
}

function userflash(btn){
btn.classList.add('userflash');
setTimeout(function (){
    btn.classList.remove('userflash')
}, 100);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInx = Math.floor(Math.random()* 4);
    let randColor = btns[randInx];
    let randbtn = document.querySelector(`.${randColor}`);
  //  console.log(randColor);
    gameSeq.push(randColor);
     console.log(gameSeq);
    gameflash(randbtn);
}

function checkAns(idx){
  //  console.log('Current Level : ', level);
  if (userSeq[idx] === gameSeq[idx]){
    if (userSeq.length == gameSeq.length){
        setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highestScore) {
        highestScore = level;
        h3.innerText = `Highest Score: ${highestScore}`;
    }
    h2.innerHTML =  `Game Over! Your score was <b>${level}</b>. <br>Press any key to Start`;
    document.querySelector('body').style.backgroundColor = 'red';
    setTimeout(function (){
         document.querySelector('body').style.backgroundColor = 'rgb(183, 221, 236)';
    }, 150);
    reset(); 
  }
}

function btnPress(){
    if (!started) return;   
//    console.log(this);
    let btn = this;
    userflash(btn);
   let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll('.btn');
for (btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
