'use strict';

// Declare app level module which depends on views, and components
var playerModule = angular.module('PlayerScoresApp', [
  'PlayerScoresApp.services',
  'PlayerScoresApp.controllers'
]);

playerModule.filter('startFrom', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	}
})

playerModule
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});