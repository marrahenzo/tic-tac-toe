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

    for (let i = 0; i < GameBoard.board.length; i++) {
      let cell = document.createElement("div");
      cell.textContent = GameBoard.board[i];
      cell.className = "board-cell";
      cell.dataset.position = i;
      cell.addEventListener("click", () => {
        if (GameBoard.board[cell.dataset.position] == "" && !gameOver) {
          timesPlayed++;
          Game.fillCell(cell.dataset.position);
          Game.addMark(currentPlayer, startingPlayer, otherPlayer);
          Game.checkGameOver(timesPlayed);
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

  const checkGameOver = (timesPlayed) => {
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
      Game.endGame("X");
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
      Game.endGame("O");
    } else if (timesPlayed > 8) {
      Game.endGame("tie");
    }
  };

  const nextTurn = () => {
    if (currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
  };

  //TODO: Add proper winning screen
  const endGame = (result, startingPlayer, otherPlayer) => {
    gameOver = true;
    switch (result) {
      case "X":
      case "O":
        if (result == startingPlayer.name)
          console.log(startingPlayer.name + "wins!");
        else console.log(otherPlayer.name + "wins!");
        break;
      case "tie":
        console.log("TIE");
        break;
    }
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

const choiceButtons = document.querySelectorAll(".btn-choice");
for (let i = 0; i < choiceButtons.length; i++) {
  choiceButtons[i].addEventListener("click", () => {
    board.className = "";
    let playerXName = document.querySelector("#player-x").nodeValue;
    let playerOName = document.querySelector("#player-o");
    const playerX = Player("X", playerXName);
    const playerO = Player("O", playerOName);
    if (choiceButtons[i].textContent == "X") Game.start(playerX, playerO);
    else Game.start(playerO, playerX);
    document.querySelector("#player-choice").remove();
  });
}
