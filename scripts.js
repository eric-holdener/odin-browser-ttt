const Gameboard = (() => {
  let board = Array(9);

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

  return { board, checkWinner };
})();

const DisplayController = (() => {
  const initializeBoard = (board) => {
    board.board.forEach(function (item, index) {

    });
  };

  const changeTile = (board, tile) => {

  };

  const boardStyling = () => {
    
  };

  return { initializeBoard, changeTile };
})();

const Player = (player) => {
  const makeMove = () => {

  };
  return { player, makeMove };
};

board = Gameboard;

document.getElementById('ttt-square').addEventListener('click', () => {

})