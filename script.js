// ID
const startPanel = document.getElementById("startPanel");
const pVp = document.getElementById("pVp");
const pVc = document.getElementById("pVc");
const click = document.getElementById("click");
const applause = document.getElementById("applause");
// ===============================================================
const turnOf = document.getElementById("turnOf");
const reboot = document.getElementById("reboot");
const rebootI = document.getElementById("rebootI");
// ===============================================================
const main = document.getElementById("main");
const board = document.getElementById("board");
const modalWin = document.getElementById("modalWin");
const winner = document.getElementById("winner");
const quit = document.getElementById("quit");
const next = document.getElementById("next");
// ===============================================================
const counterX = document.getElementById("counterX");
const totalCounter = document.getElementById("totalCounter");
const counterO = document.getElementById("counterO");

let turn = 0, you = 0, cpu = 0, ties = 0, attempts = 0, active = undefined;
let boardArray = [undefined, undefined, undefined,undefined, undefined, undefined,undefined, undefined, undefined];

// * Función click
const clickPlay = ()=>{click.play();}
const applausePlay = ()=>{applause.play();}
const applauseStop = () => {
  applause.pause();
  applause.currentTime = 0;
}
// * Función que resetea los contadores
const modifyCounters = ()=>{
  counterX.innerText = you;
  counterO.innerText = cpu;
  totalCounter.innerText = ties;
}
// * Función para resetear el tablero
const reset = ()=>{
  clickPlay();
  rebootI.classList.add("animated");
  turn = 0;
  attempts = 0;
  winner.className = "";
  boardArray = [undefined, undefined, undefined,undefined, undefined, undefined,undefined, undefined, undefined];
  if(turnOf.classList.contains("fa-o")){turnOf.classList.replace("fa-o", "fa-xmark");}
  initialBoard();
  setTimeout(()=>{rebootI.classList.remove("animated");},1600);
}
// * Función que se activa cuando hay un empate
const draw = ()=>{
  attempts++;
  if(attempts === 9){
    setTimeout(()=>{modalWin.classList.remove("hidden");}, 800);
    ties++;
    modifyCounters();
  }
}
// * Función de Ganador
const heWon = (s1, s2, s3, active) =>{

  if(active){
    board.children[s1].classList.add("active-x");
    board.children[s2].classList.add("active-x");
    board.children[s3].classList.add("active-x");
    winner.classList.add("fa-solid", "fa-xmark");
    you++;
  }else{
    board.children[s1].classList.add("active-o");
    board.children[s2].classList.add("active-o");
    board.children[s3].classList.add("active-o");
    winner.classList.add("fa-solid", "fa-o");
    cpu++;
  }
  modifyCounters();

  setTimeout(() => {
    modalWin.classList.remove("hidden");
    applausePlay();
    boardArray = [undefined, undefined, undefined,undefined, undefined, undefined,undefined, undefined, undefined];
  }, 1000);
}
//Función para comparar y saber si hay un ganador
const finish = (value)=>{
  for (let i = 0; i < boardArray.length; i+=3) {
    if(value === boardArray[i] && value === boardArray[i+1] && value === boardArray[i+2]){
      return heWon(i, i+1, i+2, active);
    }
  }
  for (let i = 0; i < 2; i++) {
    if(value === boardArray[i] && value === boardArray[i+3] && value === boardArray[i+6]){
      return heWon(i, i+3, i+6, active);
    }
  }
  if(value === boardArray[0] && value === boardArray[4] && value === boardArray[8]){
    return heWon(0, 4, 8, active);
  }
  else if(value === boardArray[2] && value === boardArray[4] && value === boardArray[6]){
    return heWon(2, 4, 6, active);
  }
}
//Función para continuar con otra partida
const nextBtn = ()=>{
  clickPlay();
  modalWin.classList.add("hidden");
  applauseStop();
  reset();
}
//Reiniciar por completo todo, regresando a la pantalla de inicio
const quitBtn = ()=>{
  clickPlay();
  modalWin.classList.add("hidden");
  main.classList.add("hidden");
  startPanel.classList.remove("hidden");
  you = 0; 
  cpu = 0; 
  ties = 0;
  modifyCounters();
  applauseStop();
}
//Función para agregar la "x" o el "o"
const shiftChange = (square, num)=>{
  clickPlay();
  if(!(square.hasChildNodes())){
    let spanSquare = document.createElement("span");
    spanSquare.classList.add("fa-solid");
    boardArray[num] = turn;

    if(turn == 0){
      spanSquare.classList.add("fa-xmark");
      turnOf.classList.replace("fa-xmark", "fa-o");
      active = true;
      turn = 1;
    }else if(turn == 1){
      spanSquare.classList.add("fa-o");
      turnOf.classList.replace("fa-o", "fa-xmark");
      active = false;
      turn = 0;
    }
    square.appendChild(spanSquare);
    draw();
    finish(boardArray[num]);
    return
  }else{console.log("Si tiene");}
}
//Función para crear el tablero
const initialBoard = ()=>{
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let square = document.createElement("div");
    square.classList.add("board_square");
    square.addEventListener("click", ()=>{shiftChange(square, i);});

    board.appendChild(square);
  }
}
//Función para juagar Player vs Player
const pvpBtn = ()=>{
  reset();
  clickPlay();
  startPanel.classList.add("hidden");
  main.classList.remove("hidden");
  initialBoard();
}

pVp.addEventListener("click", pvpBtn);
reboot.addEventListener("click", reset);
next.addEventListener("click", nextBtn);
quit.addEventListener("click", quitBtn);
modifyCounters();