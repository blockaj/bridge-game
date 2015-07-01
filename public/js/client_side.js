/*=====================================
 * All client side related code
 *
 * DEPENDENCIES
 *   - jQuery
 *   - Socket.io
 *=====================================*/


// USERID is set assigned a value when the client
// connects to the server and is then used to
// let the server know what cards to give to who
var USERID;

function cardToString(cardNumber) {
	switch (cardNumber) {
		case 1:
			return '&#127186;';
			break;
		case 2:
			return '&#127187;';
			break;
		case 3:
			return '&#127188;';
			break;
		case 4:
			return '&#127189;';
			break;
		case 5:
			return '&#127190;';
			break;
		case 6:
			return '&#127191;';
			break;
		case 7:
			return '&#127192;';
			break;
		case 8:
			return '&#127193;';
			break;
		case 9:
			return '&#127194;';
			break;
		case 10:
			return '&#127195;';
			break;
		case 11:
			return '&#127197;';
			break;
		case 12:
			return '&#127198;';
			break;
		case 13:
			return '&#127185;';
			break;
		case 14:
			return '&#127170;';
			break;
		case 15:
			return '&#127171;';
			break;
		case 16:
			return '&#127172;';
			break;
		case 17:
			return '&#127173;';
			break;
		case 18:
			return '&#127174;';
			break;
		case 19:
			return '&#127175;';
			break;
		case 20:
			return '&#127176;';
			break;
		case 21:
			return '&#127177;';
			break;
		case 22:
			return '&#127178;';
			break;
		case 23:
			return '&#127179;';
			break;
		case 24:
			return '&#127181;';
			break;
		case 25:
			return '&#127182;';
			break;
		case 26:
			return '&#127169;';
			break;
		case 27:
			return '&#127154;';
			break;
		case 28:
			return '&#127155;';
			break;
		case 29:
			return '&#127156;';
			break;
		case 30:
			return '&#127157;';
			break;
		case 31:
			return '&#127158;';
			break;
		case 32:
			return '&#127159;';
			break;
		case 33:
			return '&#127160;';
			break;
		case 34:
			return '&#127161;';
			break;
		case 35:
			return '&#127162;';
			break;
		case 36:
			return '&#127163;';
			break;
		case 37:
			return '&#127165;';
			break;
		case 38:
			return '&#127166;';
			break;
		case 39:
			return '&#127153;';
			break;
		case 40:
			return '&#127138;';
			break;
		case 41:
			return '&#127139;';
			break;
		case 42:
			return '&#127140;';
			break;
		case 43:
			return '&#127141;';
			break;
		case 44:
			return '&#127142;';
			break;
		case 45:
			return '&#127143;';
			break;
		case 46:
			return '&#127144;';
			break;
		case 47:
			return '&#127145;';
			break;
		case 48:
			return '&#127146;';
			break;
		case 49:
			return '&#127147;';
			break;
		case 50:
			return '&#127149;';
			break;
		case 51:
			return '&#127150;';
			break;
		case 52:
			return '&#127137;';
			break;
		default:
			return '&#127199;';
	}
}

function sortNumber (a, b) {
	return a - b;
}

var socket = io.connect('http://localhost:3000');

socket.on('on_connected', function (data) {
	USERID = data.id;
	console.log('Successfully connected to websocket. My id is ' + data.id);
});

socket.on('number_player', function (data) {
	$('.number-of-players').html('<p>' + data.numberOfPlayers + ' out of 4 players</p>');
});

socket.on('ready', function () {
	removeLoadingEl();
	socket.emit('hand_request', {id: USERID});
});

socket.on('hand', function (data) {
	var hand = data.hand.sort(sortNumber);
	console.log(hand);
	$('.hand').html('');
	placeCards(hand);

});

socket.on('disconnected', function() {
	$('body').html('<center><p>Player disconnected. Reload page to begin.</p></center>');
	socket.disconnect();
});

function removeLoadingEl() {
	$('img').remove();
	$('.number-of-players').remove();
}

function placeCards(hand) {
	for (var i = 0; i < 13; i++) {
		if (hand[i] > 13 && hand[i] < 40) {
			$('.hand').append('<span class="red card">' + cardToString(hand[i]) + '</span>');
		} else {
			$('.hand').append('<span class="black card">' + cardToString(hand[i]) + '</span>');
		}
		$('.partner').append('<span class="card">&#127136;</span>');
	}
}
