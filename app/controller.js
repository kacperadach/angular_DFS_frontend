var app = angular.module('PlayerScoresApp.controllers', []);

app.controller('playersController', function($scope, $log, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.currentPage = 0;
	$scope.pageSize = 32;
	$scope.playersList = [];
	$scope.filterList = [];
	$scope.currentPlayer = null;
	$scope.weekPerformances = [];

	$scope.getGameData = function (player) {
		$scope.currentPlayer = player;
		$scope.weekPerformances = player.WeekPerformances;
	}

	$scope.showMore = function () {
		$scope.pageSize += 32;
	}
	$scope.showLess = function () {
		$scope.pageSize -= 32;
	}

	$scope.sortPos = function (pos) {
		console.log('test');
		var keyword = new RegExp(pos, 'i');
			var tempList = [];
			for(var i = 0; i < $scope.playersList.length; i++) {
				if (keyword.test($scope.playersList[i].position)) {
					tempList.push($scope.playersList[i]);
				}
			} 
			$scope.filterList = tempList;
	}

	$scope.$watch('nameFilter', function (term) {
		if(term == null || term == "") {
			$scope.filterList = $scope.playersList;
		}
		else {
			var keyword = new RegExp(term, 'i');
			var tempList = [];
			for(var i = 0; i < $scope.playersList.length; i++) {
				if (keyword.test($scope.playersList[i].name)) {
					tempList.push($scope.playersList[i]);
				}
			} 
			$scope.filterList = tempList;
		}
	})

	$scope.numberOfPages = function ()  {
		return Math.ceil($scope.filterList.length/$scope.pageSize);
	};

	playerscoresAPIservice.getallPlayers().then(
		function (response) {
			$scope.playersList = response.data;
			$scope.filterList = response.data;
		},
		function (response) {
			$log.error(response.statusText);
		});
});
