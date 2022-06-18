"use strict";

// Selecting elements, then storing them in variables for convenience.
const chips = document.getElementById("chipTotal");
const hitBtn = document.getElementById("hitButton");
const standBtn = document.getElementById("standButton");
const newRoundBtn = document.getElementById("newRoundButton");
const playerScore = document.getElementById("playerScore");
const dealerScore = document.getElementById("dealerScore");
const playerCard = document.getElementById("playerCard");
const dealerCard = document.getElementById("dealerCard");
const wager = document.getElementById("wager");

let playing;
let number;
let playerTotal, dealerTotal;

// Should be ran everytime a user clicks the 'New Round' button.
const init = function () {
  if (
    !wager.value ||
    wager.value > Number(chips.textContent) ||
    wager.value < 1 ||
    chips.textContent == 0
  ) {
    console.log("Sorry, you can't play again!");
    return;
  }

  playerScore.textContent = 0;
  dealerScore.textContent = 0;
  playerCard.src = "card_1.png";
  dealerCard.src = "card_1.png";

  playerTotal = 0;
  dealerTotal = 0;
  playing = true;

  // Player's cards (two at the beginning)
  number = Math.trunc(Math.random() * 11) + 1;
  playerTotal += number;
  playerCard.src = `card_${number}.png`;
  playerScore.textContent = String(playerTotal);

  number = Math.trunc(Math.random() * 11) + 1;
  playerTotal += number;
  playerCard.src = `card_${number}.png`;
  playerScore.textContent = String(playerTotal);

  // Dealer's card (one is shown)
  number = Math.trunc(Math.random() * 11) + 1;
  dealerTotal += number;
  dealerCard.src = `card_${number}.png`;
  dealerScore.textContent = String(dealerTotal);

  if (playerTotal === 21) {
    console.log("Player wins!");
    chips.textContent = String(Number(chips.textContent) + wager.value * 1.5);
    playing = false;
  }
};

newRoundBtn.addEventListener("click", init);

hitBtn.addEventListener("click", function () {
  if (playing) {
    number = Math.trunc(Math.random() * 11) + 1;
    playerTotal += number;
    playerCard.src = `card_${number}.png`;
    playerScore.textContent = playerTotal;

    if (playerTotal > 21) {
      console.log("Player has busted!");
      chips.textContent = String(Number(chips.textContent) - wager.value);
      playing = false;
    }
  }
});

standBtn.addEventListener("click", function () {
  if (playing) {
    while (dealerTotal < 17) {
      number = Math.trunc(Math.random() * 11) + 1;
      dealerTotal += number;
      dealerCard.src = `card_${number}.png`;
      dealerScore.textContent = dealerTotal;
    }

    if (playerTotal < dealerTotal) {
      console.log("Player loses!");
      chips.textContent = String(Number(chips.textContent) - wager.value);
      playing = false;
    }

    if (playerTotal === dealerTotal) {
      console.log("It's a push!");
      playing = false;
    }

    if (playerTotal > dealerTotal || dealerTotal > 21) {
      console.log("Player wins!");
      chips.textContent = String(Number(chips.textContent) + wager.value * 2);
      playing = false;
    }
  }
});
