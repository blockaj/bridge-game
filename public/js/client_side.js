var socket = io.connect('http://localhost:3000');

socket.on('on_connected', function (data) {
	console.log('Successfully connected to websocket. My id is ' + data.id);
});

socket.on('number_player', function (data) {
	$('.number-of-players').html('<p>' + data.numberOfPlayers + ' out of 4 players</p>');
});
