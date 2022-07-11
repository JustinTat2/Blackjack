("use strict");

// Select score elements
const dealerScore = document.querySelector(".dealer-score");
const playerScore = document.querySelector(".player-score");

// Select game message.
const gameMessage = document.querySelector(".game-message");

// Select buttons.
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

  // Dealer's first ace must be an 11, if the total does not exceed 21.
  if (dealerHasAce)
    dealerScore.textContent = String(Number(dealerScore.textContent) + 10);

  // If a player gets an Ace and a 10 on their first two cards.
  if (playerHasAce && Number(playerScore.textContent) + 10 === 21) {
    playerScore.textContent = "21";
    gameMessage.textContent = "Player wins! Press start button to play again.";
    playing = false;
  }
}

function hit() {
  if (playing === false) return;

  addPlayerCard();

  if (Number(playerScore.textContent) === 21) {
    gameMessage.textContent = "Player wins! Press start button to play again.";
    playing = false;
    return;
  }

  if (Number(playerScore.textContent) > 21) {
    gameMessage.textContent =
      "Player busts! Dealer wins! Press start button to play again.";
    playing = false;
    return;
  }
}

function stand() {
  if (playing === false) return;

  // If a player's ace can turn from a 1 to an 11 without exceeding 21, we do it.
  if (playerHasAce && Number(playerScore.textContent) + 10 <= 21) {
    playerScore.textContent = String(Number(playerScore.textContent) + 10);
  }

  while (Number(dealerScore.textContent) < 17) {
    addDealerCard();

    if (dealerHasAce && Number(dealerScore.textContent) + 10 <= 21) {
      dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
    }
  }

  if (Number(dealerScore.textContent) > 21) {
    gameMessage.textContent =
      "Dealer busts! Player wins! Press start button to play again.";
    playing = false;
    return;
  }

  if (Number(dealerScore.textContent) === Number(playerScore.textContent)) {
    gameMessage.textContent = "It's a push! Press start button to play again.";
    playing = false;
    return;
  }

  if (Number(dealerScore.textContent) > Number(playerScore.textContent)) {
    gameMessage.textContent = "Dealer wins! Press start button to play again.";
    playing = false;
    return;
  }

  if (Number(playerScore.textContent) > Number(dealerScore.textContent)) {
    gameMessage.textContent = "Player wins! Press start button to play again.";
    playing = false;
    return;
  }
}

startBtn.addEventListener("click", init);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
