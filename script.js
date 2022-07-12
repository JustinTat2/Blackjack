("use strict");

const dealerScore = document.querySelector(".dealer-score");
const playerScore = document.querySelector(".player-score");

const gameMessage = document.querySelector(".game-message");

const hitBtn = document.querySelector(".hit-btn");
const standBtn = document.querySelector(".stand-btn");
const startBtn = document.querySelector(".start-btn");

const dealerCards = document.querySelector(".dealers-cards");
const playerCards = document.querySelector(".players-cards");

let playing;
let number;
let playerHasAce;
let dealerHasAce;

function addPlayerCard() {
  number = Math.floor(Math.random() * 10 + 1);
  if (number === 1) {
    playerHasAce = true;
  }
  const card = document.createElement("IMG");
  card.src = `card_${number}.png`;
  card.height = "120";
  card.width = "100";
  card.style.marginLeft = "5px";
  playerCards.appendChild(card);

  playerScore.textContent = String(Number(playerScore.textContent) + number);

  // Ex. A player gets a 10 and an Ace.
  if (playerHasAce && Number(playerScore.textContent) + 10 === 21) {
    playerScore.textContent = "21";
    gameMessage.textContent = "Player wins!";
    playing = false;
  }
}

function addDealerCard() {
  number = Math.floor(Math.random() * 10 + 1);
  if (number === 1) {
    dealerHasAce = true;
  }
  const card = document.createElement("IMG");
  card.src = `card_${number}.png`;
  card.height = "120";
  card.width = "100";
  card.style.marginLeft = "5px";
  dealerCards.appendChild(card);

  dealerScore.textContent = String(Number(dealerScore.textContent) + number);

  // Dealer's first Ace must count as 11, unless doing so would exceed 21.
  if (dealerHasAce && Number(dealerScore.textContent) + 10 <= 21) {
    dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
  }
}

function init() {
  dealerScore.textContent = "0";
  playerScore.textContent = "0";
  gameMessage.textContent = "Hit or stand?";

  // Clear the cards from the last round.
  while (dealerCards.children.length > 2) {
    dealerCards.removeChild(dealerCards.lastChild);
  }

  while (playerCards.children.length > 2) {
    playerCards.removeChild(playerCards.lastChild);
  }

  // Reset variables
  playing = true;
  playerHasAce = false;
  dealerHasAce = false;

  addPlayerCard();
  addPlayerCard();

  addDealerCard();
}

function hit() {
  if (playing === false) return;

  addPlayerCard();

  if (Number(playerScore.textContent) === 21) {
    gameMessage.textContent = "Player wins!";
    playing = false;
    return;
  }

  if (Number(playerScore.textContent) > 21) {
    gameMessage.textContent = "Player busts! Dealer wins!";
    playing = false;
    return;
  }
}

function stand() {
  if (playing === false) return;

  // If a player's ace can turn from a 1 to an 11 without exceeding 21.
  if (playerHasAce && Number(playerScore.textContent) + 10 <= 21) {
    playerScore.textContent = String(Number(playerScore.textContent) + 10);
  }

  while (Number(dealerScore.textContent) < 17) addDealerCard();

  // Check conditions
  if (Number(dealerScore.textContent) > 21) {
    gameMessage.textContent = "Dealer busts! Player wins!";
    playing = false;
    return;
  }

  if (Number(dealerScore.textContent) === Number(playerScore.textContent)) {
    gameMessage.textContent = "It's a tie!";
    playing = false;
    return;
  }

  if (Number(dealerScore.textContent) > Number(playerScore.textContent)) {
    gameMessage.textContent = "Dealer wins!";
    playing = false;
    return;
  }

  if (Number(playerScore.textContent) > Number(dealerScore.textContent)) {
    gameMessage.textContent = "Player wins!";
    playing = false;
    return;
  }
}

startBtn.addEventListener("click", init);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
