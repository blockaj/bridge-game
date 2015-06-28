// angular.js is not browserified so we have to require the file
// without assigning it a value. This will pull the whole file injector
// out bundle.js
require('../../bower_components/angular/angular.js');

//Controllers required here
var HomeController = require('./controllers/HomeController');

//Services required here
var GameService = require('./services/game');


var app = angular.module('bridge', []);

// GameService is a dependency of HomeController so it
// must come first
GameService(app);
HomeController(app);
