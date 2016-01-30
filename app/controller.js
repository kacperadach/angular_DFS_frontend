angular.module('PlayerScoresApp.controllers', []).
	controller('playersController', function($scope, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.currentPage = 0;
	$scope.pageSize = 32;
	$scope.playersList = [];

	$scope.searchFilter = function (player) {
		var keyword = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || keyword.test(player.name); 
	};

	$scope.numberOfPages = function ()  {
		return Math.ceil($scope.playersList.length/$scope.pageSize);
	};

	playerscoresAPIservice.getPlayers().then(
		function (response) {
			$scope.playersList = response.data;
		},
		function (response) {
			console.log('Error ' + response.statusText);
		});
});