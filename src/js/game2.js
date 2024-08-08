// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const cardArray = [
  {
    name: 'oveja',
    img: '../images/Oveja.webp',
  },
  {
    name: 'cabra',
    img: '../images/Cabra.webp',
  },
  {
    name: 'cerdo',
    img: '../images/Cerdo.webp',
  },
  {
    name: 'elefante',
    img: '../images/Elefante.webp',
  },
  {
    name: 'gallina',
    img: '../images/Gallina.webp',
  },
  {
    name: 'vaca',
    img: '../images/Vaca.webp',
  },
  {
    name: 'oveja',
    img: '../images/Oveja.webp',
  },
  {
    name: 'cabra',
    img: '../images/Cabra.webp',
  },
  {
    name: 'cerdo',
    img: '../images/Cerdo.webp',
  },
  {
    name: 'elefante',
    img: '../images/Elefante.webp',
  },
  {
    name: 'gallina',
    img: '../images/Gallina.webp',
  },
  {
    name: 'vaca',
    img: '../images/Vaca.webp',
  },
];

const gameElement = document.getElementById('game');
const finalResultElement = document.getElementById('result');

document.addEventListener('DOMContentLoaded', () => {
  cardArray.sort(() => 0.5 - Math.random());

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  //Crear el tablero
  const createBoard = () => {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', '../images/card.jpg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      gameElement.appendChild(card);
    }
  };

  //Comprobar si hay coincidencias
  const checkForMatch = () => {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', '../images/card.jpg');
      cards[optionTwoId].setAttribute('src', '../images/card.jpg');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', '../images/white.png');
      cards[optionTwoId].setAttribute('src', '../images/white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', '../images/card.jpg');
      cards[optionTwoId].setAttribute('src', '../images/card.jpg');
    }

    cardsChosen = [];
    cardsChosenId = [];
    finalResultElement.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      finalResultElement.textContent = '¡Felicidades! ¡Has conseguido encontrar todas las parejas!';
    }
  };

  //Girar la tarjeta
  const flipCard = event => {
    const card = event.target;
    let cardId = card.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    card.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 800);
    }
  };

  createBoard();
});
