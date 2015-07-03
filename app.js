/*=============================================
 * Handles all interactions between server and
 * client and updates game model
 *
 * DEPENDENCIES
 * - Express
 * - Socket.io
 * - Chalk
 * - node-uuid
 * - game.core.js
 *=============================================*/
var express = require('express'),
	http = require('http'),
	io = require('socket.io'),
	chalk = require('chalk'),
	gameport = 3000,

	//Verbose is set to true for debugging
	verbose = false,

	//Assigns unique id to socket.io client
	UUID = require('node-uuid'),
	app = express(),
	server = http.createServer(app),
	GameCore = require('./game.core.js'),
	Player = GameCore.Player,
	GameHandle = GameCore.GameHandle;

//Chalk function for statuses
var library = chalk.bold.red;

//Express-related setup
server.listen(gameport);

console.log('\t' + library(' :: Express ::') + ' Listening on port ' +
			gameport);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/*', function (req, res, next) {
	var file = req.params[0];
	if (verbose) {
		console.log('\t ' + library(':: Express ::') + ' file requested: ' +
					file);
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

	//Send our new clients user id to our new client
	client.emit('on_connected', {id: client.userid});

	var newPlayer = new Player(client.userid);
	connected_players.push(newPlayer);
	console.log('\t' + library(' :: socket.io :: ') + connected_players.length +
				' out of 4 connected players');
	sio.emit('number_player', {numberOfPlayers: connected_players.length});

	gameRoomFull(connected_players, function () {
		GameHandle.assignTeams(connected_players);
		GameHandle.dealCards();
		sio.emit('ready');
	});

	client.on('hand_request', function (data) {
		GameHandle.findPlayer(newPlayer, function (currentPlayer) {
			client.emit('hand', { hand: currentPlayer.hand });
		});
	});
	console.log('\t' + library(' :: socket.io :: ') + ' player ' +
				client.userid + ' connected\n');

	client.on('disconnect', function () {
		for (var i = 0; i < connected_players.length; i++) {
			if (connected_players[i].userId == client.userid) {
				connected_players.splice(i, 1);
				console.log('\t' + library(' :: socket.io :: ') +
							connected_players.length +
							' out of 4 connected players');

				sio.emit('number_player', {numberOfPlayers: connected_players.length});
			}
		}
		sio.emit('disconnected');
		console.log('\t' + library(' :: socket.io :: ') + 'player ' +
					client.userid + ' disconnected\n');
	});

});

function gameRoomFull(connected_players, callback) {
	if (connected_players.length == 4) {
		callback();
	}
}
