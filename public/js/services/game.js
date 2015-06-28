module.exports = function (app) {
	app.service('game', ['$http', function ($http) {
		return http.get('localhost')
		.success (function (data) {
			return data;
		})
		.error (function (err) {
			return err;
		});
	}]);
};
