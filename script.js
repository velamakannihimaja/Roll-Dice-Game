'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const finalScore1 = document.querySelector('#score--0');
const playerOneCurrScore = document.querySelector('#current--0');
const finalScore2 = document.querySelector('#score--1');
const playertwoCurrScore = document.querySelector('current--1');

const rollDice = document.querySelector('.btn--roll');
const diceImg = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');

//initial conditions
let activePlayer = 0;
let currScore = 0;
let playerScore = [0, 0];
let playing = true;
finalScore1.textContent = 0;
finalScore2.textContent = 0;
diceImg.classList.add('hidden');

//funcstions
const roll = function () {
  let diceValue = Math.trunc(Math.random() * 6) + 1;
  return diceValue;
};

const switchPlayer = function () {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0; //change to current player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

hold.addEventListener('click', function () {
  if (playing) {
    playerScore[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScore[activePlayer];

    if (playerScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }

  switchPlayer();
});

//game
rollDice.addEventListener('click', function () {
  if (playing) {
    const randNumber = roll();
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randNumber}.png`;

    if (randNumber !== 1) {
      currScore = currScore + randNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  currScore = 0;
  playerScore = [0, 0];
  activePlayer = 0;
  playing = true;
  finalScore1.textContent = 0;
  finalScore2.textContent = 0;
  diceImg.classList.add('hidden');
});
