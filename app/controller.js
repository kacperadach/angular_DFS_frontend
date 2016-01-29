angular.module('PlayerScoresApp.controllers', []).
	controller('playersController', function($scope, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.playersList = [];

	playerscoresAPIservice.getPlayers().then(
		function (response) {
			$scope.playersList = response.data;
		},
		function (response) {
			console.log('Error ' + response.statusText);
			console.log(response.status);
		});
});