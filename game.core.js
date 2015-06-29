var shuffle = require('knuth-shuffle').knuthShuffle;

var Player = function (userId) {
	this.userId = userId;
	this.hand = [];
};

var GameCore = function () {
	// Create two bridge teams
	this.teams = [new Team(), new Team()];

	this.cardDeck = new CardDeck();
};

GameCore.prototype.assignTeams = function (players) {
	this.teams[0].players = [players[0], players[2]];
	this.teams[1].players = [players[1], players[3]];
};

GameCore.prototype.dealCards = function () {
	//Shuffle the deck
	this.cardDeck.cards = shuffle(this.cardDeck.cards);
	for (var i = 0; i < 12; i++) {
		for (var v = 0; v < 1; v++) {
			for (var t = 0; t < 1; t++) {
				this.teams[t].players[v].hand.push(4*i+t+2*v);
			}
		}
	}
};

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
	GameHandle: GameCore,
	Player: Player
};
