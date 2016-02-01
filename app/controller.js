angular.module('PlayerScoresApp.controllers', []).
	controller('playersController', function($scope, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.currentPage = 0;
	$scope.pageSize = 32;
	$scope.playersList = [];
	$scope.filterList = [];

	$scope.$watch('nameFilter', function (term) {
		if(term == null || term == "") {
			$scope.filterList = $scope.playersList;
		}
		else {
			var keyword = new RegExp(term, 'i');
			var tempList = [];
			for(var i = 0; i < $scope.playersList.length; i++) {
				console.log($scope.playersList[i].name);
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

	playerscoresAPIservice.getPlayers().then(
		function (response) {
			$scope.playersList = response.data;
			$scope.filterList = response.data;
		},
		function (response) {
			console.log('Error ' + response.statusText);
		});
});