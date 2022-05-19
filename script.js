const GameBoard = (() => {
  //let board = ["X", "X", "O", "X", "O", "O", "X", "O", "X"];
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const Game = (() => {
  let currentPlayer;

  const start = (startingPlayer) => {
    currentPlayer = startingPlayer.id;
    const board = document.querySelector("#game-board");
    for (let i = 0; i < GameBoard.board.length; i++) {
      let cell = document.createElement("div");
      cell.textContent = GameBoard.board[i];
      cell.className = "board-cell";
      cell.dataset.position = i;
      cell.addEventListener("click", () => {
        if (GameBoard.board[cell.dataset.position] == "") {
          Game.fillCell(cell.dataset.position);
          Game.nextTurn(currentPlayer);
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

  const nextTurn = (playingPlayer) => {
    currentPlayer = playingPlayer == "X" ? "O" : "X";
  };

  return { start, nextTurn, fillCell, nextTurn };
})();

const Player = (playerId) => {
  let id = playerId;
  return { id };
};

const playerX = Player("X");
const playerO = Player("O");
Game.start(playerX);
