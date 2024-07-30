// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

/* button.addEventListener('click', () => {
  console.log('BUTTON CLICKED');
}); */

//Game 1 - Simon

const turnCounterElement = document.getElementById('turn');
const topLeftElement = document.getElementById('topleft');
const topRightElement = document.getElementById('topright');
const bottomLeftElement = document.getElementById('bottomleft');
const bottomRightElement = document.getElementById('bottomright');
const strictButtonElement = document.getElementById('strict');
const onButtonElement = document.getElementById('on');
const startButtonElement = document.getElementById('start');

//Variables
let order = []; //Orden de las luces
let playerOrder = []; //Orden user presiona las luces
let light; //Número flases/colores que aparecen
let turn; //En que turno estamos
let good; //User correct or incorrect
let pcTurn; //Turno de user o del computer
let intervalId;
let strict = false; //Si el strick ha sido marcado
let on = false; //Si el power ha sido marcado
let win; //Si has ganado el juego

//Si el strick Buttom está chequeado
strictButtonElement.addEventListener('click', event => {
  if (strictButtonElement.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

//Si el power Buttom está chequeado
onButtonElement.addEventListener('click', event => {
  if (onButtonElement.checked == true) {
    on = true;
    turnCounterElement.innerHTML = '-';
  } else {
    on = false;
    turnCounterElement.innerHTML = '';
    clearColor();
    clearInterval(intervalId);
  }
});

//Empezar juego, si el juego esta encendido o has ganado llamar a la función playGame
startButtonElement.addEventListener('click', event => {
  if (on || win) {
    playGame();
  }
});

//Reseteamos los valores y hacemos un bucle para que nos salga un número aleatorio entre 1 - 4
const playGame = () => {
  win = false;
  order = [];
  playerOrder = [];
  light = 0;
  intervalId = 0;
  turn = 1;
  turnCounterElement.innerHTML = 1;
  good = true;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  pcTurn = true;

  intervalId = setInterval(gameTurn, 800);
};

const gameTurn = () => {
  on = false; //Jugador no pueda tocar los botones si no está encendido

  if (light == turn) {
    clearInterval(intervalId);
    pcTurn = false;
    clearColor();
    on = true;
  }

  if (pcTurn) {
    clearColor();
    setTimeout(() => {
      if (order[light] == 1) colorOne(); // Si el primer numero aleatorio de la array es 1 ejecuta la función colorOne
      if (order[light] == 2) colorTwo();
      if (order[light] == 3) colorThree();
      if (order[light] == 4) colorFour();
      light++;
    }, 200);
  }
};

//Colores cuando se encienden
const colorOne = () => {
  topLeftElement.style.backgroundColor = 'lightgreen';
};
const colorTwo = () => {
  topRightElement.style.backgroundColor = 'tomato';
};
const colorThree = () => {
  bottomLeftElement.style.backgroundColor = 'yellow';
};
const colorFour = () => {
  bottomRightElement.style.backgroundColor = 'lightskyblue';
};

const clearColor = () => {
  topLeftElement.style.backgroundColor = 'darkgreen';
  topRightElement.style.backgroundColor = 'darkred';
  bottomLeftElement.style.backgroundColor = 'goldenrod';
  bottomRightElement.style.backgroundColor = 'darkblue';
};

const lightColor = () => {
  topLeftElement.style.backgroundColor = 'lightgreen';
  topRightElement.style.backgroundColor = 'tomato';
  bottomLeftElement.style.backgroundColor = 'yellow';
  bottomRightElement.style.backgroundColor = 'lightskyblue';
};

//Funcionabilidad del boton de arriba a la izquierda
topLeftElement.addEventListener('click', event => {
  if (on) {
    playerOrder.push(1);
    checkUserElection();
    colorOne();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Funcionabilidad del boton de arriba a la derecha
topRightElement.addEventListener('click', event => {
  if (on) {
    playerOrder.push(2);
    checkUserElection();
    colorTwo();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Funcionabilidad del boton de abajo a la izquierda
bottomLeftElement.addEventListener('click', event => {
  if (on) {
    playerOrder.push(3);
    checkUserElection();
    colorThree();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Funcionabilidad del boton de abajo a la derecha
bottomRightElement.addEventListener('click', event => {
  if (on) {
    playerOrder.push(4);
    checkUserElection();
    colorFour();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Comprobar la eleccion del usuario
const checkUserElection = () => {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;

  if (playerOrder.length == 5 && good) {
    winGame();
  }

  if (good == false) {
    lightColor();
    turnCounterElement.innerHTML = 'NO';
    setTimeout(() => {
      turnCounterElement.innerHTML = turn;
      clearColor();

      if (strict) {
        playGame();
      } else {
        pcTurn = true;
        light = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    pcTurn = true;
    light = 0;
    turnCounterElement.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
};

const winGame = () => {
  lightColor();
  turnCounterElement.innerHTML = 'WIN';
  on = false;
  win = true;
};
