var app = angular.module('PlayerScoresApp.services', []);

app.factory('playerscoresAPIservice', function($http) {

   	var playerscoresAPI = {};

   	playerscoresAPI.getallPlayers = function() {
   		return $http({
   			method: 'GET',
   			url: 'http://159.203.65.178:8000/players/?format=json'
   		});
   	}
   
   return playerscoresAPI;
});
