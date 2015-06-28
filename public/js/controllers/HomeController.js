module.exports = function (app) {
	app.controller('HomeController', ['game', '$scope', function (game, $scope) {
		$scope.buttons = [
			'Create Game',
			'Join Game'
		];
		$scope.buttonClick = function () {
			console.log ('Button clicked');
			game.success(function (data) {
				console.log (data);
			});
			game.error(function (err) {
				console.error (err);
			});
		};

	}]);
};
