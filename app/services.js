angular.module('PlayerScoresApp', []).factory('playerscoresAPIservice', function($http) {

   	var playerscoresAPI = {};

   	playerscoresAPI.getDrivers = function() {
   		return $http({
   			method: 'JSONP',
   			url: '0.0.0.0:8001/QB/'
   		});
   	}
   
   return playerscoresAPI;
   });
