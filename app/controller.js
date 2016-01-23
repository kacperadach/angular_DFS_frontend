angular.module('PlayerScoresApp.controllers', []).
	controller('playersController', function($scope, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.playersList = [];

	playerscoresAPIservice.getPlayers().success(function (response) {
		$scope.playersList = response;
	});
});