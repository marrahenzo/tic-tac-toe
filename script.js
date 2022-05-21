const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const Game = (() => {
  let currentPlayer;
  let gameOver = false;
  let timesPlayed = 0;

  const start = (startingPlayer, otherPlayer) => {
    currentPlayer = startingPlayer.id;
    const board = document.querySelector("#game-board");

    //Fill game board with divs for cells
    for (let i = 0; i < GameBoard.board.length; i++) {
      let cell = document.createElement("div");
      cell.textContent = GameBoard.board[i];
      cell.className = "board-cell";
      cell.dataset.position = i;
      cell.addEventListener("click", () => {
        //If cell is empty, fill it and check if the player has won
        if (GameBoard.board[cell.dataset.position] == "" && !gameOver) {
          timesPlayed++;
          Game.fillCell(cell.dataset.position);
          Game.addMark(currentPlayer, startingPlayer, otherPlayer);
          Game.checkGameOver(timesPlayed, startingPlayer, otherPlayer);
          Game.nextTurn();
        }
      });
      board.appendChild(cell);
    }
  };

  const fillCell = (index) => {
    GameBoard.board[index] = currentPlayer;
    document.querySelector(`[data-position="${index}"]`).textContent =
      currentPlayer;
    document
      .querySelector(`[data-position="${index}"]`)
      .classList.add("marked");
  };

  const addMark = (player, startingPlayer, otherPlayer) => {
    if (player == "X") startingPlayer.marks++;
    else otherPlayer.marks++;
  };

  const checkGameOver = (timesPlayed, startingPlayer, otherPlayer) => {
    let board = GameBoard.board;
    if (
      (board[0] == "X" && board[1] == "X" && board[2] == "X") ||
      (board[3] == "X" && board[4] == "X" && board[5] == "X") ||
      (board[6] == "X" && board[7] == "X" && board[8] == "X") ||
      (board[0] == "X" && board[3] == "X" && board[6] == "X") ||
      (board[1] == "X" && board[4] == "X" && board[7] == "X") ||
      (board[2] == "X" && board[5] == "X" && board[8] == "X") ||
      (board[0] == "X" && board[4] == "X" && board[8] == "X") ||
      (board[6] == "X" && board[4] == "X" && board[2] == "X")
    ) {
      Game.endGame("X", startingPlayer, otherPlayer);
    } else if (
      (board[0] == "O" && board[1] == "O" && board[2] == "O") ||
      (board[3] == "O" && board[4] == "O" && board[5] == "O") ||
      (board[6] == "O" && board[7] == "O" && board[8] == "O") ||
      (board[0] == "O" && board[3] == "O" && board[6] == "O") ||
      (board[1] == "O" && board[4] == "O" && board[7] == "O") ||
      (board[2] == "O" && board[5] == "O" && board[8] == "O") ||
      (board[0] == "O" && board[4] == "O" && board[8] == "O") ||
      (board[6] == "O" && board[4] == "O" && board[2] == "O")
    ) {
      Game.endGame("O", startingPlayer, otherPlayer);
    } else if (timesPlayed > 8) {
      Game.endGame("tie");
    }
  };

  const nextTurn = () => {
    if (currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
  };

  const endGame = (result, startingPlayer, otherPlayer) => {
    gameOver = true;
    document.querySelector("#game-board").classList.add("finished");
    //Creates DOM elements for winning text, restart button and credits
    let winText = document.createElement("p");
    winText.id = "win-text";
    let restartButton = document.createElement("a");
    restartButton.id = "restart-button";
    restartButton.textContent = "Restart";
    restartButton.href = "./index.html";
    let credits = document.createElement("div");
    credits.id = "credits";
    let creditsText = document.createElement("a");
    creditsText.textContent = "2022 © Hernán Marrapodi";
    creditsText.href = "https://github.com/marrahenzo";
    let creditsLogo = document.createElement("img");
    creditsLogo.src = "./media/github-logo.png";
    creditsLogo.width = 25;
    creditsText.append(creditsLogo);
    credits.append(creditsText);
    switch (result) {
      case "X":
      case "O":
        //Determine winning text
        if (result == startingPlayer.id)
          winText.textContent = startingPlayer.name + " wins!";
        else winText.textContent = otherPlayer.name + " wins!";
        break;
      case "tie":
        console.log("TIE");
        break;
    }
    document.querySelector("body").append(winText, restartButton, credits);
  };

  return {
    start,
    nextTurn,
    fillCell,
    addMark,
    checkGameOver,
    nextTurn,
    endGame,
  };
})();

const Player = (playerId, playerName) => {
  let id = playerId;
  let name = playerName;
  return { id, name };
};

const board = document.querySelector("#game-board");
board.className = "disabled";

//Behavior for choosing starting player
const choiceButtons = document.querySelectorAll(".btn-choice");
for (let i = 0; i < choiceButtons.length; i++) {
  choiceButtons[i].addEventListener("click", () => {
    for (let button of choiceButtons) button.classList.remove("chosen");
    choiceButtons[i].classList.add("chosen");
  });
}

const playButton = document.querySelector("#btn-play");
playButton.addEventListener("click", () => {
  //Get player names, determine starting player and delete the main menu
  board.className = "";
  let playerXName = document.querySelector("#player-x").value;
  if (playerXName == "") playerXName = "Player X";
  let playerOName = document.querySelector("#player-o").value;
  if (playerOName == "") playerOName = "Player O";
  const playerX = Player("X", playerXName);
  const playerO = Player("O", playerOName);
  let chosenButton = document.querySelector(".btn-choice.chosen");
  if (chosenButton.textContent == "X") Game.start(playerX, playerO);
  else Game.start(playerO, playerX);
  document.querySelector("#player-choice").remove();
});
