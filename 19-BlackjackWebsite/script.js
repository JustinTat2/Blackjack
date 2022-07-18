("use strict");

const dealerScore = document.querySelector(".dealer-score");
const playerScore = document.querySelector(".player-score");

const gameMessage = document.querySelector(".game-message");

const hitBtn = document.querySelector(".hit-btn");
const standBtn = document.querySelector(".stand-btn");
const startBtn = document.querySelector(".start-btn");

const dealerCards = document.querySelector(".dealer-hand");
const playerCards = document.querySelector(".player-hand");

let playing;
let number;
let playerHasAce;
let dealerHasAce;

let deck;
let change = [11, 12, 13, 24, 25, 26, 37, 38, 39, 50, 51, 52];

function addPlayerCard() {
  let randomElement = deck[Math.floor(Math.random() * deck.length)];

  if (change.includes(randomElement)) {
    number = 10;
  } else {
    number = randomElement % 13;
  }

  if (number === 1) {
    playerHasAce = true;
  }

  const card = document.createElement("IMG");
  card.src = `cards/card_${randomElement}.png`;
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

  const index = deck.indexOf(randomElement);
  deck.splice(index, 1);
}

function addDealerCard() {
  let randomElement = deck[Math.floor(Math.random() * deck.length)];

  if (change.includes(randomElement)) {
    number = 10;
  } else {
    number = randomElement % 13;
  }

  if (number === 1) {
    dealerHasAce = true;
  }

  const card = document.createElement("IMG");
  card.src = `cards/card_${randomElement}.png`;
  card.height = "120";
  card.width = "100";
  card.style.marginLeft = "5px";
  dealerCards.appendChild(card);

  dealerScore.textContent = String(Number(dealerScore.textContent) + number);

  // Dealer's first Ace must count as 11, unless doing so would exceed 21.
  if (dealerHasAce && Number(dealerScore.textContent) + 10 <= 21) {
    dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
  }

  const index = deck.indexOf(randomElement);
  deck.splice(index, 1);
}

function init() {
  dealerScore.textContent = "0";
  playerScore.textContent = "0";
  gameMessage.textContent = "Hit or stand?";

  // Clear the cards from the last round.
  while (dealerCards.children.length > 1) {
    dealerCards.removeChild(dealerCards.lastChild);
  }

  while (playerCards.children.length > 1) {
    playerCards.removeChild(playerCards.lastChild);
  }

  // Reset variables
  playing = true;
  playerHasAce = false;
  dealerHasAce = false;

  deck = Array.from({ length: 52 }, (_, i) => i + 1);

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
