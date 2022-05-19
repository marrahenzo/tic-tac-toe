const GameBoard = (() => {
  let board = ["X", "X", "O", "X", "O", "O", "X", "O", "X"];
  return { board };
})();

const Game = (() => {
  let currentPlayer;

  const start = (startingPlayer) => {
    console.log("a");
    currentPlayer = startingPlayer;
    const board = document.querySelector("#game-board");
    for (let boardCell of GameBoard.board) {
      console.log("a");
      let cell = document.createElement("div");
      cell.textContent = boardCell;
      cell.className = "board-cell";
      board.appendChild(cell);
    }
  };

  const nextTurn = (currentPlayer) => {
    currentPlayer = currentPlayer == "x" ? "o" : "x";
  };

  return { start, nextTurn };
})();

const Player = (id) => {
  let playerId = id;
  return { playerId };
};

Game.start("x");
