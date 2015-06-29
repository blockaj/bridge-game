var express = require('express'),
	http = require('http'),
	io = require('socket.io'),
	gameport = 3000,

	//Verbose is set to true for debugging
	verbose = false,

	//Assigns unique id to socket.io client
	UUID = require('node-uuid'),
	app = express(),
	server = http.createServer(app);

var GameCore = require('./game.server.js');
var Player = GameCore.Player;
var GameHandle = new GameCore.GameHandle;


//Express-related setup
server.listen(gameport);

console.log('\t :: Express :: Listening on port ' + gameport);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/*', function (req, res, next) {
	var file = req.params[0];
	if (verbose) {
		console.log('\t :: Express :: file requested: ' + file);
	}
	res.sendFile(__dirname + '/' + file);
});


//Socket.io-related setup
var sio = io.listen(server);
sio.set('log level', 0);

sio.set('authorization', function (handshakeData, callback) {
	callback(null, true);
});

var connected_players = [];

sio.sockets.on('connection', function (client) {
	client.userid = UUID();
	client.emit('on_connected', {id: client.userid});
	connected_players.push(new Player(client.userid));

	console.log('\t :: socket.io :: ' + connected_players.length + ' out of 4 connected players');
	sio.emit('number_player', {numberOfPlayers: connected_players.length});

	if (connected_players.length == 4) {
		GameHandle.assignTeams(connected_players);
		GameHandle.dealCards();
	}
	console.log('\t :: socket.io :: player ' + client.userid + ' connected');

	client.on('disconnect', function () {
		for (var i = 0; i < connected_players.length; i++) {
			if (connected_players[i].userId == client.userid) {
				console.log(connected_players[i]);
				connected_players = connected_players.splice(i, 1);
				console.log('\t :: socket.io :: ' + connected_players.length + ' out of 4 connected players');
				sio.emit('number_player', {numberOfPLayers: connected_players.length});
			}
		}
		console.log('\t :: socket.io :: player ' + client.userid + ' disconnected');
	});
});
