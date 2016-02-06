var app = angular.module('PlayerScoresApp.services', []);

app.factory('playerscoresAPIservice', function($http) {

   	var playerscoresAPI = {};

   	playerscoresAPI.getallPlayers = function() {
   		return $http({
   			method: 'GET',
   			url: 'http://0.0.0.0:8001/players/?format=json'
   		});
   	}
   
   return playerscoresAPI;
});
