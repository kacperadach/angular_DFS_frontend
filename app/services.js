angular.module('PlayerScoresApp.services', []).
	factory('playerscoresAPIservice', function($http) {

   	var playerscoresAPI = {};

   	playerscoresAPI.getPlayers = function() {
   		return $http({
   			method: 'GET',
   			url: 'http://0.0.0.0:8001/QB/?format=json'
   		});
   	}
   
   return playerscoresAPI;
});
