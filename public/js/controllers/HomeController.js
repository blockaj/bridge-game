module.exports = function (app) {
	app.controller('HomeController', ['$scope', function ($scope) {
		$scope.buttons = [
			'Create Game',
			'Join Game'
		];
	}]);
};
