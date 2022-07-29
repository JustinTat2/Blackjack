("use strict");

const dealerScore = document.querySelector(".dealer-score");
const playerScore = document.querySelector(".player-score");

const gameMessage = document.querySelector(".game-message");

const hitBtn = document.querySelector(".hit-btn");
const standBtn = document.querySelector(".stand-btn");
const startBtn = document.querySelector(".start-btn");

const dealerCards = document.querySelector(".dealer-hand");
const playerCards = document.querySelector(".player-hand");

let playing, deck, playerHasAce, dealerHasAce;

function generateNum() {
  const jqkCards = [11, 12, 13, 24, 25, 26, 37, 38, 39, 50, 51, 52];

  let randomElement = deck[Math.floor(Math.random() * deck.length)];
  let number = jqkCards.includes(randomElement) ? 10 : randomElement % 13;

  return [randomElement, number];
}

function createCard(randomElement) {
  const card = document.createElement("IMG");
  card.src = `cards/card_${randomElement}.png`;
  card.height = "120";
  card.width = "100";
  card.style.marginLeft = "5px";
  return card;
}

function init() {
  dealerScore.textContent = "0";
  playerScore.textContent = "0";
  gameMessage.textContent = "Hit or stand?";

  while (dealerCards.children.length > 1) {
    dealerCards.removeChild(dealerCards.lastChild);
  }

  while (playerCards.children.length > 1) {
    playerCards.removeChild(playerCards.lastChild);
  }

  playing = true;
  playerHasAce = false;
  dealerHasAce = false;

  // Create array of ints 1-52 (for each playing card)
  deck = Array.from({ length: 52 }, (_, i) => i + 1);

  addPlayerCard();
  addPlayerCard();

  addDealerCard();
}

function addPlayerCard() {
  const [randomElement, number] = generateNum();

  if (number === 1) playerHasAce = true;

  playerCards.appendChild(createCard(randomElement));

  playerScore.textContent = String(Number(playerScore.textContent) + number);

  // Ex. 10 and Ace
  if (playerHasAce && Number(playerScore.textContent) + 10 === 21) {
    playerScore.textContent = "21";
    gameMessage.textContent = "Player wins!";
    playing = false;
  }

  deck.splice(deck.indexOf(randomElement), 1);
}

function addDealerCard() {
  const [randomElement, number] = generateNum();

  if (number === 1) dealerHasAce = true;

  dealerCards.appendChild(createCard(randomElement));

  dealerScore.textContent = String(Number(dealerScore.textContent) + number);

  // If possible, dealer's first Ace must count as 11
  if (dealerHasAce && Number(dealerScore.textContent) + 10 <= 21) {
    dealerScore.textContent = String(Number(dealerScore.textContent) + 10);
  }

  deck.splice(deck.indexOf(randomElement), 1);
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

  // If possible, turn player's Ace in 11
  if (playerHasAce && Number(playerScore.textContent) + 10 <= 21) {
    playerScore.textContent = String(Number(playerScore.textContent) + 10);
  }

  while (Number(dealerScore.textContent) < 17) addDealerCard();

  if (Number(dealerScore.textContent) > 21) {
    gameMessage.textContent = "Dealer busts! Player wins!";
    playing = false;
    return;
  } else if (
    Number(dealerScore.textContent) === Number(playerScore.textContent)
  ) {
    gameMessage.textContent = "It's a tie!";
    playing = false;
    return;
  } else if (
    Number(dealerScore.textContent) > Number(playerScore.textContent)
  ) {
    gameMessage.textContent = "Dealer wins!";
    playing = false;
    return;
  } else if (
    Number(playerScore.textContent) > Number(dealerScore.textContent)
  ) {
    gameMessage.textContent = "Player wins!";
    playing = false;
    return;
  }
}

startBtn.addEventListener("click", init);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
