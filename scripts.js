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

function playerFactory(name, icon, winMessage) {
  const play = function (e) {
    console.log('play');
    console.log(e.target);
    console.log(e.target.dataset.player)
    if(e.target.dataset.player == 0) {
      console.log('if statement');
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

  document.getElementById('new-game-button').remove();

  newGameButton = document.createElement('btn');
  newGameButton.classList.add('btn');
  newGameButton.classList.add('btn-danger');
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
            if(checkWinner) {
              // player 1 wins
            }
          }
          break;
        case Player.SECOND:
          if (player2.play(e)) {
            turn = Player.FIRST;
            e.target.dataset.player = Player.SECOND;
            round++;
            if(checkWinner) {
              // player 2 wins
            }
          }

      };
    } else {
      // display tie message
    };
  };

  function reset() {
    turn = Player.FIRST;
    round = 0;
    Gameboard.reset();
  };

  function checkWinner() {

  };

  gameboard.forEach(cell => {
    cell.addEventListener('click', play);
  });
});

document.getElementById('new-game-button').addEventListener('click', function() {
  Game()
});