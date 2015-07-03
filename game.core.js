var shuffle = require('knuth-shuffle').knuthShuffle;

var Player = function (userId) {
	this.userId = userId;
	this.hand = [];
	this.position = '';
};

var GameCore = function () {
	// Create two bridge teams
	this.teams = [new Team(), new Team()];

	this.cardDeck = new CardDeck();
};

GameCore.prototype.assignTeams = function (players) {
	this.teams[0].players = [players[0], players[2]];
	
	this.teams[0].players[0].position = 'north';
	this.teams[0].players[1].position = 'south';

	this.teams[1].players = [players[1], players[3]];

	this.teams[1].players[0].position = 'east';
	this.teams[1].players[1].position = 'west';
};


GameCore.prototype.cleanHands = function () {
	for (var v = 0; v < 2; v++) {
		for (var t = 0; t < 2; t++) {
			this.teams[t].players[v].hand = [];
		}
	}
};

GameCore.prototype.dealCards = function () {
	this.cleanHands();

	//Shuffle the deck
	this.cardDeck.cards = shuffle(this.cardDeck.cards);
	for (var i = 0; i < 13; i++) {
		for (var v = 0; v < 2; v++) {
			for (var t = 0; t < 2; t++) {
				this.teams[t].players[v].hand.push(this.cardDeck.cards[4*i+t+2*v]);
			}
		}
	}
};

GameCore.prototype.findPlayer = function (playerToFind, callback) {
	var numberOfPlayersAndTeams = 2;
	for (var i = 0; i < numberOfPlayersAndTeams; i++) {
		for (var t = 0; t < numberOfPlayersAndTeams; t++) {
			var currentPlayer = this.teams[t].players[i];
			if (currentPlayer.userId == playerToFind.userId) {
				callback(currentPlayer);
			}
		}
	}
}

var CardDeck = function () {
	// Generate a deck of cards in the form of a
	// 52 element array
	this.cards = [];
	for (var i = 0; i < 52; i++) {
		this.cards[i] = i+1;
	}
};

CardDeck.prototype.removeCard = function (card) {
	var index = this.cards.indexOf(card);
	this.cards = this.cards.splice(index, 1);
};

var Team = function () {
	this.players = [];
	this.tricksWon = 0;
	this.aboveLine = 0;
	this.belowLine = 0;
};

module.exports = {
	GameHandle: new GameCore,
	Player: Player,
};
