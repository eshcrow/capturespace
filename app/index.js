// Generated by CoffeeScript 1.10.0
(function() {
  var C, SAT, V, _CFG, _ROOMS, _SESID, _UINFO, add, app, express, hash, http, io, ipaddress, login, mag, quadtree, serverport, sub;

  express = require('express');

  app = express();

  http = require('http').Server(app);

  io = require('socket.io')(http);

  SAT = require('sat');

  quadtree = require('simple-quadtree');

  _CFG = require('../data/cfg.json');

  _UINFO = require('../data/uinfo.json');

  _SESID = [];

  _ROOMS = [];


  /*
  	What contains what:
  
  	Rooms contain {
  		Array of Actors [
  			Actor {
  				type = player
  				Player (cloned) {
  					Session ID
  					Name
  					Color / Skin
  					Score Data
  				}
  				3-Vector
  				QE 
  				Velocity
  				Item
  				Status (Jailed or not)
  			}
  		]
  		Array of Obstacles [
  			Obstacle {
  				Vertices [
  					3vecs (relative to center)
  				]
  				3-Vector
  				QE
  				Velocity
  			}
  		]
  		Array of Items [
  			3-Vector
  			QE
  		]
  		Chat [
  			Message {
  				Text
  				Timestamp
  				Originating Playername
  			}
  		]
  		Determining function for jail areas, player areas, etc.
  		Room ID
  	}
   */

  V = SAT.Vector;

  C = SAT.Circle;

  mag = require('vectors/mag')(2);

  add = require('vectors/add')(2);

  sub = require('vectors/sub')(2);

  hash = function(password) {
    var H, x;
    H = '';
    x = (Math.random() + "").slice(2) + (Math.random() + "").slice(2);
    for (var i = 0; (i+2) < x.length; i++)
		H += String.fromCharCode((9+i) * parseInt(x.slice(i,i+2),16));
    return password + H;
  };

  login = function(name, pass) {};

  console.log(hash("pass"));

  ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';

  serverport = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || _CFG.port;

  if (process.env.OPENSHIFT_NODEJS_IP != null) {
    http.listen(serverport, ipaddress, function() {
      return console.log('[DEBUG] Listening on *:' + serverport);
    });
  } else {
    http.listen(serverport, function() {
      return console.log('[DEBUG] Listening on *:' + _CFG.port);
    });
  }

}).call(this);
