// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

let buttonOptionElement = document.querySelectorAll('.button-option');
let popUpElement = document.getElementById('popup__message');
let newGameElement = document.getElementById('new-game');
let restartButtonElement = document.getElementById('restart');
let messageElement = document.getElementById('message');

//Objeto de los posibles patrones ganadores
let codePattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//Variables
let xTurn = true;
let count = 0;

//Desabilitar todos los botones
const disableAllButtons = () => {
  buttonOptionElement.forEach(element => (element.disabled = true));
  popUpElement.classList.remove('hide');
};

//Habilitar todos los botones
const allowButtons = () => {
  buttonOptionElement.forEach(element => {
    element.innerText = '';
    element.disabled = false;
  });
  popUpElement.classList.add('hide');
};

//Ganador X/O
const winGame = letter => {
  disableAllButtons();
  if (letter == 'X') {
    messageElement.innerHTML = "'X' Wins";
  } else {
    messageElement.innerHTML = "'O' Wins";
  }
};

//Empate
const tieFunction = () => {
  disableAllButtons();
  messageElement.innerHTML = "It's a Draw";
};

//Jugar otra vez
newGameElement.addEventListener('click', event => {
  count = 0;
  allowButtons();
});
restartButtonElement.addEventListener('click', event => {
  count = 0;
  allowButtons();
});

//Jugar
const checkElection = () => {
  for (let i of codePattern) {
    let [element1, element2, element3] = [
      buttonOptionElement[i[0]].innerText,
      buttonOptionElement[i[1]].innerText,
      buttonOptionElement[i[2]].innerText,
    ];
    //Comprobamos si los elementos están llenos
    if (element1 != '' && (element2 != '') & (element3 != '')) {
      if (element1 == element2 && element2 == element3) {
        //Si los 3 botones tienen los mismos valores, pasa la funcion - winGame
        winGame(element1);
      }
    }
  }
};

//Mostrar X/O al hacer clic
buttonOptionElement.forEach(element => {
  element.addEventListener('click', event => {
    if (xTurn) {
      xTurn = false;
      //Mostrar la letra X
      element.innerText = 'X';
      element.disabled = true;
    } else {
      xTurn = true;
      //Mostrar la letra Y
      element.innerText = 'O';
      element.disabled = true;
    }
    //Incrementar el recuento en cada clic
    count += 1;
    if (count == 9) {
      tieFunction();
    }
    //Comprobación
    checkElection();
  });
});
