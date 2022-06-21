const Gameboard = (() => {

  const newBoard = () => {
    return Array.apply(null, Array(9)).map(function () {});
  }

  let board = newBoard()

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
    if(checkValid(index)) {
      board[index] = value;
    };

    return board
  };



  const checkValid = (index) => {
    if(board[index] === undefined) {
      return true;
    } else {
      return false;
    };
  };

  return { board, checkWinner, updateBoard, newBoard };
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
      tile = boardStyling(item, index, 'valid-move');
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
    change = document.querySelector(`[data-id="${index}"]`)
    change.innerHTML = tile;
    change.classList.add('invalid-move');
    change.classList.remove('valid-move');
  };

  const boardStyling = (tile, index, button_class) => {
    column = document.createElement('div');
    column.classList.add('col');

    card = document.createElement('div');
    card.classList.add('card');

    context = document.createElement('button');
    context.classList.add('card-text');
    context.classList.add('btn');
    context.classList.add(button_class);
    context.dataset.id = index;
    context.innerHTML = tile;

    card.appendChild(context);
    column.appendChild(card);
    return column;
  };

  return { initializeBoard, changeTile };
})();

const Player = (player) => {
  const makeMove = (board, index) => {
    newBoard = board.updateBoard(index, player);
    return newBoard;
  };
  return { player, makeMove };
};

document.getElementById('new-game-button').addEventListener('click', function() {
  board = Gameboard;
  player_1 = Player(1);
  player_2 = Player(2);
  display = DisplayController;
  turnCounter = 0;

  container = document.getElementById('gamecontainer');

  if(container.childNodes.length > 0) {
    board.board = board.newBoard;
    console.log(board.board);
    turnCounter = 0;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    };
    display.initializeBoard(board);
  } else {
    display.initializeBoard(board);
  }

  buttons = document.getElementsByClassName('valid-move');
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      if(turnCounter % 2 == 0) {
        newBoard = player_1.makeMove(board, this.dataset.id);
        if (board[this.dataset.id] != newBoard[this.dataset.id]) {
          board[this.dataset.id] = newBoard[this.dataset.id];
          turnCounter += 1;
          display.changeTile('X', this.dataset.id)
        } else {
          console.log('oopsie whoopsies');
        }
      } else {
        newBoard = player_2.makeMove(board, this.dataset.id);
        if (board[this.dataset.id] != newBoard[this.dataset.id]) {
          board[this.dataset.id] = newBoard[this.dataset.id];
          turnCounter += 1;
          display.changeTile('O', this.dataset.id)
        } else {
          console.log('oops, that move was taken!');
        }
      }
    });
  }

});