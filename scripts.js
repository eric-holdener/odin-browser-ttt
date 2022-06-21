const Gameboard = (() => {
  const container = document.getElementById('gamecontainer');
  let gameboard = [];

  const init = function () {
    row1 = document.createElement('div');
    row1.classList.add('row');
    row1.setAttribute('id', 'row1');
    row2 = document.createElement('div');
    row2.classList.add('row');
    row2.setAttribute('id', 'row2');
    row3 = document.createElement('div');
    row3.classList.add('row');
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
      cell.dataset.player = '';
      cell.querySelector('img').src = '';
    })
  };

  const creation = function (player, index, image) {
    column = document.createElement('div');
    column.classList.add('col');
    column.dataset.id = index;
    column.dataset.player = player;

    card = document.createElement('div');
    card.classList.add('card');

    context = document.createElement('button');
    context.classList.add('card-text');
    context.classList.add('btn');

    
    img = document.createElement('img');
    img.src = image;

    context.appendChild(img);
    card.appendChild(context);
    column.appendChild(card);
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
    const img = e.target.querySelector('img');
    if (img.src.length === 0) {
      img.src = icon;
      return true;
    };
  };

  return { play, name, icon, winMessage };
}

const Game = (() => {
  console.log('game')
  let turn = Player.FIRST;
  const totalRounds = 8;
  let round = 0;
  let player1 = playerFactory('player 1', 'assets/x.png', 'X wins');
  let player2 = playerFactory('player 2', 'assets/y.png', 'Y wins');
  Gameboard.init();
  let gameboard = Gameboard.gameboard;
  document.getElementById('new-game-button').removeEventListener('click', function() {
    Game()
  });
  document.getElementById('new-game-button').addEventListener('click', function() {
    reset();
  })

  function play() {
    if (round != totalRounds) {
      switch(turn) {
        case FIRST:
          player1.play();
        case SECOND:
          player2.play();
      };
    } else {
      // display tie message
    };
  };

  function reset() {

    round = 0;
    gameboard.reset();
  };

  function checkWinner() {

  };

  gameboard.forEach(cell => {
    cell.addEventListener('click', play);
  });

  return { play };
});

document.getElementById('new-game-button').addEventListener('click', function() {
  Game()
})