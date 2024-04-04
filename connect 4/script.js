const NULL_BOARD = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

let board = NULL_BOARD;

const board1 = board.map((row, r) => {
  const children = row.map((cell, c) => {
    return `<div class="cells" onclick="dropColor(${r},${c})"></div>`;
  });
  return `<div style="display:flex;">${children.join("")}</div>`;
});
const string = `<div class="board">${board1.join("")}</div>`;
const root = document.getElementById("root");
root.innerHTML = string;

let colorSelector = true;
function dropColor(row, col) {
  const colorPicker = colorSelector ? "#dac4ae" : "#6a261b";
  colorSelector = !colorSelector;
  for (r = 5; r >= 0; r--) {
    if (board[r][col] === null) {
      board[r][col] = colorPicker;
      updateBoard();
      winCondition();
      break;
    }
  }
}

function updateBoard() {
  const cells = document.getElementsByClassName("cells");
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const color = board[r][c] || "transparent";
      cells[r * 7 + c].style.backgroundColor = color;
    }
  }
}

const winCondition = () => {
  const colors = ["#dac4ae", "#6a261b"];
  for (const color of colors) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j <= board.length; j++) {
        let win = true;
        for (let k = 0; k < 4; k++) {
          if (board[i][j + k] !== color) {
            win = false;
            break;
          }
        }
        if (win) {
          alert("Win!");
          break;
        }
      }
    }
    for (let i = 0; i <= board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let win = true;
        for (let k = 0; k < 4; k++) {
          if (board[i + k][j] !== color) {
            win = false;
            break;
          }
        }
        if (win) {
          alert("Win!");
          break;
        }
      }
    }
    for (let i = 0; i <= board.length; i++) {
      for (let j = 0; j <= board.length; j++) {
        let win = true;
        for (let k = 0; k < 4; k++) {
          if (board[i + k][j + k] !== color) {
            win = false;
            break;
          }
        }
        if (win) {
          alert("Win!");
          break;
        }
      }
    }
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j <= board.length; j++) {
        let win = true;
        for (let k = 0; k < 4; k++) {
          if (board[i - k][j + k] !== color) {
            win = false;
            break;
          }
        }
        if (win) {
          alert("Win!");
          break;
        }
      }
    }
  }
};

document.getElementById("hover-area").addEventListener("mouseover", () => {
  document.addEventListener("keydown", keyboardInput);
});
function keyboardInput(e) {
  dropColor(0, +e.key - 1);
}
