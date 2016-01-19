angular.module('PlayerScoresApp.controllers', []).
	controller('playersController', function($scope, playerscoresAPIservice) {
	$scope.nameFilter = null;
	$scope.playerList = [];

	playerscoresAPIservice.getPlayers().success(function (response) {
		$scope.playerList = 
	})

})