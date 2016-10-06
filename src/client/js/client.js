// Generated by CoffeeScript 1.10.0
var KEY_ENTER, SetupSocket, canvas, engine, game, playerName, playerNameInput, socket, submitNick, validNick;

playerName = void 0;

playerNameInput = document.getElementById('playerNameInput');

socket = void 0;

engine = void 0;

canvas = document.getElementById('cvs');

KEY_ENTER = 13;

game = new Game(canvas);

validNick = function() {
  var regex;
  regex = /^\w*$/;
  console.log('Regex Test', regex.exec(playerNameInput.value));
  return regex.exec(playerNameInput.value) !== null;
};

submitNick = function() {
  if (validNick()) {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '');
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('startMenuWrapper').style.display = 'none';
    document.getElementById('textArea').innerHTML = "Waiting to join game...";
    SetupSocket(socket);
    return socket.emit('entry_guest', playerName);
  } else {
    return nickErrorText.style.display = 'inline';
  }
};

window.onload = function() {
  'use strict';
  var entry_guest, entry_login, nickErrorText;
  entry_guest = document.getElementById('entry_guest');
  entry_login = document.getElementById('entry_login');
  nickErrorText = document.querySelector('#startMenu .input-error');
  socket = io();
  socket.on('validate_r', function(result) {
    if (result) {
      return alert("ENTRY GRANTED");
    } else {
      alert("ENTRY DENIED");
      window.location.replace("about:blank");
      return false;
    }
  });
  entry_guest.onclick = function() {
    return submitNick();
  };
  playerNameInput.addEventListener('keypress', function(e) {
    var key;
    key = e.which || e.keyCode;
    if (key === KEY_ENTER) {
      submitNick();
    }
  });
};

SetupSocket = function(socket) {
  game.handleNetwork(socket);
};

window.addEventListener('resize', (function() {
  engine.resize();
}), true);