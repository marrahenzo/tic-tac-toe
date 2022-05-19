const GameBoard = (() => {
  //let board = ["X", "X", "O", "X", "O", "O", "X", "O", "X"];
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const Game = (() => {
  let currentPlayer;
  let gameOver = false;

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
          Game.fillCell(cell.dataset.position);
          Game.nextTurn(startingPlayer, otherPlayer);
        }
      });
      board.appendChild(cell);
    }
  };

  const fillCell = (index) => {
    console.log(index);
    GameBoard.board[index] = currentPlayer;
    document.querySelector(`[data-position="${index}"]`).textContent =
      currentPlayer;
  };

  const checkGameOver = () => {
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
    } else if (startingPlayer.marks + otherPlayer.marks > 7) {
      Game.endGame("tie");
    }
  };

  const nextTurn = (startingPlayer, otherPlayer) => {
    currentPlayer = currentPlayer == "X" ? otherPlayer.id : startingPlayer.id;
  };

  const endGame = (result) => {
    switch (result) {
      case "X":
        console.log("X WINS");
        break;
      case "O":
        console.log("O WINS");
        break;
      case "tie":
        console.log("TIE");
        break;
    }
  };

  return { start, nextTurn, fillCell, checkGameOver, nextTurn, endGame };
})();

const Player = (playerId) => {
  let id = playerId;
  let marks = [];
  return { id, marks };
};

const playerX = Player("X");
const playerO = Player("O");
//Change into Game.start(playerX, playerO) but argument order changes depending
// on choice of first player
Game.start(playerX, playerO);
