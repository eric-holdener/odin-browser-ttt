const Gameboard = (() => {
  let board = Array.apply('', Array(9)).map(function () {});

  const checkWinner = () => {
    if(board[0] == board[1] == board[2]) {
      return true, board[0];
    } else if(board[3] == board[4] == board[5]) {
      return true, board[3];
    } else if(board[6] == board[7] == board[8]) {
      return true, board[6];
    } else if(board[2] == board[5] == board[8]) {
      return true, board[2];
    } else if(board[1] == board[4] == board[7]) {
      return true, board[1];
    } else if(board[0] == board[3] == board[6]) {
      return true, board[0];
    } else if(board[0] == board[4] == board[8]) {
      return true, board[0];
    } else if(board[2] == board[4] == board[7]) {
      return true, board[2];
    } 
  };

  const updateBoard = (index, value) => {
    if(checkValid) {
      board[index] = value;
    } else {
      // logic for invalid
    };
  };

  const checkValid = (index) => {
    if(board[index] === '') {
      return true;
    } else {
      return false;
    };
  };

  return { board, checkWinner, updateBoard };
})();

const DisplayController = (() => {
  const initializeBoard = (board) => {
    container = document.getElementById('gamecontainer');
    row1 = document.createElement('div');
    row1.classList.add('row');
    row1.setAttribute('id', 'row1');
    row2 = document.createElement('div');
    row2.classList.add('row');
    row2.setAttribute('id', 'row2');
    row3 = document.createElement('div');
    row3.classList.add('row');
    row3.setAttribute('id', 'row3');

    board.board.forEach(function (item, index) {
      tile = boardStyling(item, index);
      if(index < 3) {
        row1.appendChild(tile);
      } else if(index >= 3 && index < 6) {
        row2.appendChild(tile);
      } else {
        row3.appendChild(tile);
      }
    });

    container.appendChild(row1);
    container.appendChild(row2);
    container.appendChild(row3);
  };

  const changeTile = (tile, index) => {
    boardStyling(tile, index);
  };

  const boardStyling = (tile, index) => {
    column = document.createElement('div');
    column.classList.add('col');

    card = document.createElement('div');
    card.classList.add('card');

    context = document.createElement('a');
    context.classList.add('card-text');
    context.dataset.id = index;
    context.innerHTML = tile;

    card.appendChild(context);
    column.appendChild(card);
    return column;
  };

  return { initializeBoard, changeTile };
})();

const Player = (player) => {
  const makeMove = () => {

  };
  return { player, makeMove };
};

document.getElementById('new-game-button').addEventListener('click', function() {
  board = Gameboard;
  player_1 = Player(1);
  player_2 = Player(2);
  display = DisplayController;

  container = document.getElementById('gamecontainer');

  if(container.childNodes.length > 0) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    };
  };

  display.initializeBoard(board);
});