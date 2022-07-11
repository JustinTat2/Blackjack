("use strict");

// Select the score elements
const dealerScore = document.querySelector(".dealer-score");
const playerScore = document.querySelector(".player-score");

// Select the game message.
const gameMessage = document.querySelector(".game-message");

// Select the three green buttons.
const hitBtn = document.querySelector(".hit-btn");
const standBtn = document.querySelector(".stand-btn");
const startBtn = document.querySelector(".start-btn");

// Select the div containers where the cards will appear.
const dealerCards = document.querySelector(".dealers-cards");
const playerCards = document.querySelector(".players-cards");

let playing;
let number;
let playerHasAce;
let dealerHasAce;

function init() {
  dealerScore.textContent = "0";
  playerScore.textContent = "0";
  gameMessage.textContent = "Hit or stand? Choose wisely.";

  while (dealerCards.children.length > 2) {
    dealerCards.removeChild(dealerCards.lastChild);
  }

  while (playerCards.children.length > 2) {
    playerCards.removeChild(playerCards.lastChild);
  }

  playing = true;
  playerHasAce = false;
  dealerHasAce = false;

  // Look into refactoring later (DRY principle).
  number = Math.floor(Math.random() * 10 + 1);
  if (number === 1) {
    playerHasAce = true;
  }
  playerScore.textContent = String(Number(playerScore.textContent) + number);
  const playerFirstCard = document.createElement("IMG");
  playerFirstCard.src = `card_${number}.png`;
  playerFirstCard.height = "120";
  playerFirstCard.width = "100";
  playerCards.appendChild(playerFirstCard);

  number = Math.floor(Math.random() * 10 + 1);
  if (number === 1) {
    playerHasAce = true;
  }
  playerScore.textContent = String(Number(playerScore.textContent) + number);
  const playerSecondCard = document.createElement("IMG");
  playerSecondCard.src = `card_${number}.png`;
  playerSecondCard.height = "120";
  playerSecondCard.width = "100";
  playerSecondCard.style.marginLeft = "10px";
  playerCards.appendChild(playerSecondCard);

  number = Math.floor(Math.random() * 10 + 1);
  if (number === 1) {
    dealerHasAce = true;
  }
  dealerScore.textContent = String(Number(dealerScore.textContent) + number);
  const dealerFirstCard = document.createElement("IMG");
  dealerFirstCard.src = `card_${number}.png`;
  dealerFirstCard.height = "120";
  dealerFirstCard.width = "100";
  dealerCards.appendChild(dealerFirstCard);

  if (playerHasAce && Number(playerScore.textContent) + 10 === 21) {
    playerScore.textContent = "21";
    gameMessage.textContent =
      "Player has won! Press start button to start another round.";
    playing = false;
  }

  if (dealerHasAce) {
    dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
  }
}

//

function hit() {
  if (playing === false) return;
  number = Math.floor(Math.random() * 10 + 1);
  playerScore.textContent = String(Number(playerScore.textContent) + number);

  console.log(number);
  console.log(typeof number);
  console.log(playerScore.textContent);
  console.log(typeof playerScore.textContent);

  const card = document.createElement("IMG");
  card.src = `card_${number}.png`;
  card.height = "120";
  card.width = "100";
  card.style.marginLeft = "10px";
  playerCards.appendChild(card);

  if (number === 1) {
    playerHasAce = true;
  }

  if (Number(playerScore.textContent) === 21) {
    gameMessage.textContent =
      "Player has won! Press start button to start another round.";
    playing = false;
  }

  if (Number(playerScore.textContent) > 21) {
    gameMessage.textContent =
      "Player has busted! Dealer wins! Press start button to start another round.";
    playing = false;
  }
}

//

function stand() {
  if (playing === false) return;

  if (playerHasAce && Number(playerScore.textContent) + 10 <= 21) {
    playerScore.textContent = String(Number(playerScore.textContent) + 10);
  }

  while (Number(dealerScore.textContent) < 17) {
    number = Math.floor(Math.random() * 10 + 1);

    dealerScore.textContent = String(Number(dealerScore.textContent) + number);

    if (number === 1 && dealerHasAce === false) {
      dealerHasAce = true;
      if (Number(dealerScore.textContent) + 10 <= 21) {
        dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
      }
    }

    const card = document.createElement("IMG");
    card.src = `card_${number}.png`;
    card.height = "120";
    card.width = "100";
    card.style.marginLeft = "10px";
    dealerCards.appendChild(card);
  }

  if (Number(dealerScore.textContent) > 21) {
    gameMessage.textContent =
      "Dealer has busted! Player wins! Press start button to start another round.";
    playing = false;
  }

  if (Number(dealerScore.textContent) === Number(playerScore.textContent)) {
    gameMessage.textContent =
      "It's a tie! Press start button to start another round.";
    playing = false;
  }

  if (Number(dealerScore.textContent) > Number(playerScore.textContent)) {
    gameMessage.textContent =
      "Dealer wins! Press start button to start another round.";
    playing = false;
  }

  if (Number(playerScore.textContent) > Number(dealerScore.textContent)) {
    gameMessage.textContent =
      "Player wins! Press start button to start another round.";
    playing = false;
  }
}

startBtn.addEventListener("click", init);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
