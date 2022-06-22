const Gameboard = (() => {
  const container = document.getElementById('gamecontainer');
  let gameboard = [];

  const init = function () {
    row1 = document.createElement('div');
    row1.classList.add('row');
    row1.classList.add('justify-content-center');
    row1.classList.add('pb-3');
    row1.setAttribute('id', 'row1');
    row2 = document.createElement('div');
    row2.classList.add('row');
    row2.classList.add('justify-content-center');
    row2.classList.add('pb-3');
    row2.setAttribute('id', 'row2');
    row3 = document.createElement('div');
    row3.classList.add('row');
    row3.classList.add('justify-content-center');
    row3.setAttribute('id', 'row3');
    for (let i = 0; i < 9; i++) {
      tile = creation(0, i, '');
      gameboard.push(tile);
      if(i < 3) {
        row1.appendChild(tile);
      } else if(i >= 3 && i < 6) {
        row2.appendChild(tile);
      } else {
        row3.appendChild(tile);
      };
      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);
    };
  };

  const reset = function () {
    gameboard.forEach(cell => {
      cell.dataset.player = 0;
      cell.querySelector('img').src = '';
    })
  };

  const creation = function (player, index, image) {
    column = document.createElement('div');
    column.classList.add('col');
    column.classList.add('flex-grow-0');
    column.classList.add('ttt-cell');
    column.dataset.id = index;
    column.dataset.player = player;

    context = document.createElement('button');
    context.classList.add('btn');
    context.classList.add('box-styling');
    context.disabled = true;
    
    img = document.createElement('img');
    img.src = image;

    context.appendChild(img);
    column.appendChild(context);
    return column;
  };

  return { init, reset, container: container, gameboard };
})();



const Player = (() => {
  return {
    FIRST: 1,
    SECOND: 2,
    NONE: 0
  }
})();

const Modal = (() => {
  const myModal = new bootstrap.Modal(document.getElementById('winnerModal'), {
    backdrop: 'static'
  })
  console.log(myModal);
  let modalHeader = document.getElementById('modalHeader');
  let winnerMessage = document.createElement('h2');
  winnerMessage.classList.add('modal-title');

  let playAgainButton = document.getElementById('modal-play-again');
  playAgainButton.addEventListener('click', function() {
    myModal.show();
  });
  function displayPlayer(player) {
    removeOldText();
    console.log(player);
    if (player == 1) {
      winnerMessage.innerHTML = "Player X wins!";
    } else if (player == 2) {
      winnerMessage.innerHTML = "Player O wins!";
    }
    modalHeader.appendChild(winnerMessage);
    myModal.show();
  };

  function displayTie() {
    removeOldText();
    winnerMessage.innerHTML = "Tie game!";
    modalHeader.appendChild(winnerMessage);
    myModal.show();
  };

  function removeOldText() {
    if (modalHeader.firstChild) {
      modalHeader.firstChild.remove();
    };
  }

  return { displayPlayer, displayTie };
})();

function playerFactory(name, icon, winMessage) {
  const play = function (e) {
    if(e.target.dataset.player == 0) {
      const img = e.target.querySelector('img');
      img.src = icon;
      return true;
    } else {
      return false;
    }
  };

  return { play, name, icon, winMessage };
}

const Game = (() => {
  let turn = Player.FIRST;
  const totalRounds = 9;
  let round = 0;
  let player1 = playerFactory('player 1', 'assets/x.png', 'X wins');
  let player2 = playerFactory('player 2', 'assets/o.png', 'Y wins');
  Gameboard.init();
  let gameboard = Gameboard.gameboard;

  let currentPlayerContainer = document.getElementById('currentPlayerContainer');
  let currentPlayerText = document.createElement('p');
  currentPlayerText.innerHTML = 'Current Player:';
  let currentPlayerImg = document.createElement('img');
  currentPlayerImg.classList.add('current-player-img');
  currentPlayerImg.src = 'assets/x.png';

  currentPlayerContainer.appendChild(currentPlayerText);
  currentPlayerContainer.appendChild(currentPlayerImg);

  document.getElementById('new-game-button').remove();

  newGameButton = document.createElement('btn');
  newGameButton.classList.add('btn');
  newGameButton.innerHTML = 'New Game';
  newGameButton.id = 'reset-game-button';

  newGameButton.addEventListener('click', function() {
    reset();
  });

  document.getElementById('game-button').appendChild(newGameButton);

  function play(e) {
    if (round != totalRounds) {
      switch(turn) {
        case Player.FIRST:
          if (player1.play(e)) {
            turn = Player.SECOND;
            e.target.dataset.player = Player.FIRST;
            round++;
            if(checkWinner() === true) {
              Modal.displayPlayer(1);
            } else {
              currentPlayerImg.src = 'assets/o.png';
            };
          }
          break;
        case Player.SECOND:
          if (player2.play(e)) {
            turn = Player.FIRST;
            e.target.dataset.player = Player.SECOND;
            round++;
            if(checkWinner() === true) {
              Modal.displayPlayer(2)
            } else {
              currentPlayerImg.src = 'assets/x.png';
            };
          }

      };
    } else {
      Modal.displayTie();
    };
  };

  function reset() {
    console.log('reset')
    turn = Player.FIRST;
    round = 0;
    currentPlayerImg.src = 'assets/x.png';
    Gameboard.reset();
  };

  function checkWinner() {
    console.log('check winner');
    for (let i = 0; i < 9; i = i + 3) {
      if (gameboard[i].dataset.player != "0") {
          if ((gameboard[i].dataset.player === gameboard[i + 1].dataset.player) && (gameboard[i + 1].dataset.player === gameboard[i + 2].dataset.player)) { //check rows
            return true;
          }
      }
    }
    for (let i = 0; i < 3; i++) {
        if (gameboard[i].dataset.player != "0") {
            if ((gameboard[i].dataset.player === gameboard[i + 3].dataset.player) && (gameboard[i + 3].dataset.player === gameboard[i + 6].dataset.player)) { //check cols
              return true;
            }
        }
    }
    if (gameboard[0].dataset.player != "0") {
        if ((gameboard[0].dataset.player === gameboard[4].dataset.player) && (gameboard[4].dataset.player === gameboard[8].dataset.player)) { 
          return true;
        }
    }
    if (gameboard[2].dataset.player != "0") {
        if ((gameboard[2].dataset.player === gameboard[4].dataset.player) && (gameboard[4].dataset.player === gameboard[6].dataset.player)) {
          return true;
        }
    }

    return false;
  };

  gameboard.forEach(cell => {
    cell.addEventListener('click', play);
  });

  modalPlayAgain = document.getElementById('modal-play-again');
  modalPlayAgain.addEventListener('click', function() {
    reset();
  });
});

document.getElementById('new-game-button').addEventListener('click', function() {
  Game()
});