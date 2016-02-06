var app = angular.module('PlayerScoresApp.controllers', ["chart.js"]);

app.controller('playersController', function($scope, $log, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.currentPage = 0;
	$scope.pageSize = 32;
	$scope.playersList = [];
	$scope.filterList = [];
	$scope.currentPlayer = null;
	$scope.weekPerformances = [];
	$scope.curPosition = "all";

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
		if($scope.curPosition == pos) {
			$scope.curPosition = "all";
			$scope.filterList = $scope.playersList;
		}
		else {
			$scope.curPosition = pos;
			var keyword = new RegExp(pos, 'i');
			var tempList = [];
			for(var i = 0; i < $scope.playersList.length; i++) {
				if (keyword.test($scope.playersList[i].position)) {
					tempList.push($scope.playersList[i]);
				}
			} 
			$scope.filterList = tempList;
		}
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

app.controller('LineCtrl', function($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});
