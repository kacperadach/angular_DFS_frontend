var app = angular.module('PlayerScoresApp.controllers', ["chart.js"]);

app.controller('playersController', function($scope, $rootScope, $log, playerscoresAPIservice) {
	
	$scope.nameFilter = null;
	$scope.currentPage = 0;
	$scope.pageSize = 18;
	$scope.playersList = [];
	$scope.filterList = [];
	$scope.currentPlayer = null;
	$scope.weekPerformances = [];
	$scope.curPosition = "all";

	$scope.getGameData = function (player) {
		$scope.currentPlayer = player;
		$scope.weekPerformances = player.WeekPerformances;
		var label = [];
		for(var x = 0; x < $scope.WeekPerformances.length; x++) {
			label.push($scope.WeekPerformances[x].week);
		}
		$scope.labels = label;
  		$scope.series = [$scope.currentPlayer.name];

  		var label = [];
		for(var x = 0; x < $scope.WeekPerformances.length; x++) {
			label.push($scope.WeekPerformances[x].points);
		}
  		$scope.data = label;
	}

	$scope.addPlayer = function (player) {
		$rootScope.$broadcast('add', { player: player });
	}

	$scope.showMore = function () {
		$scope.pageSize += 10;
	}
	$scope.showLess = function () {
		$scope.pageSize -= 10;
	}

	$scope.sortPos = function (pos) {
		if($scope.curPosition == pos) {
			$scope.curPosition = "all";
			$scope.filterList = $scope.playersList;
			$scope.currentPage = 0;
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
			$scope.currentPage = 0;
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

app.controller('lineupController', function($scope, $rootScope, $log, playerscoresAPIservice) {
	
	$scope.lineup = [];
	$scope.qblist = [];
	$scope.rblist = [];
	$scope.wrlist = [];
	$scope.telist = [];
	$scope.deflist = [];
	$scope.flexlist = [];
	$scope.totalPlayers = 0;
	$scope.remainingSalary = 50000;
	$scope.salaryPerPlayer = 5555;
	$scope.displaySalaryPerPlayer = 5555;

	$scope.$on('add', function (event, args) {
		var player = args.player;
		addToLineup(player);
	});

	function adjustSalaryNumbers(player, add) {
		if (add) {
			if (!playerInLineup(player)) {
				$scope.totalPlayers += 1;
				$scope.remainingSalary -= player.salary;
				if ($scope.totalPlayers == 9) {
					$scope.salaryPerPlayer = 0;
				}
				else {
					$scope.salaryPerPlayer = $scope.remainingSalary / (9 - $scope.totalPlayers);
				}
				$scope.displaySalaryPerPlayer = Math.floor($scope.salaryPerPlayer);
			}
		}
		else {
			$scope.totalPlayers -= 1;
			$scope.remainingSalary += player.salary;
			if ($scope.totalPlayers == 9) {
					$scope.salaryPerPlayer = 0;
				}
				else {
					$scope.salaryPerPlayer = $scope.remainingSalary / (9 - $scope.totalPlayers);
				}
			$scope.displaySalaryPerPlayer = Math.floor($scope.salaryPerPlayer);
		}
	}

	function playerInLineup(player) {
		return containsObject(player, $scope.qblist) ||
			containsObject(player, $scope.rblist) ||
			containsObject(player, $scope.wrlist) ||
			containsObject(player, $scope.telist) ||
			containsObject(player, $scope.deflist) ||
			containsObject(player, $scope.flexlist);

	}

	function addToLineup(player) {
		if(player.position == "QB") {
			if($scope.qblist.length == 0) {
				adjustSalaryNumbers(player, true);
				$scope.qblist.push(player);
			}
		} else if(player.position == "RB") {
			if($scope.rblist.length <= 1 && !containsObject(player, $scope.rblist)) {
				adjustSalaryNumbers(player, true);
				$scope.rblist.push(player);
			} else if($scope.flexlist.length == 0 && !containsObject(player, $scope.rblist)) {
				adjustSalaryNumbers(player, true);
				$scope.flexlist.push(player);
			}
		} else if(player.position == "WR") {
			if($scope.wrlist.length <= 2 && !containsObject(player, $scope.wrlist)) {
				adjustSalaryNumbers(player, true);
				$scope.wrlist.push(player);
			} else if($scope.flexlist.length == 0 && !containsObject(player, $scope.wrlist)) {
				adjustSalaryNumbers(player, true);
				$scope.flexlist.push(player);
			}
		} else if(player.position == "TE") {
			if($scope.telist.length == 0) {
				adjustSalaryNumbers(player, true);
				$scope.telist.push(player);
			} else if($scope.flexlist.length == 0 && !containsObject(player, $scope.telist)) {
				adjustSalaryNumbers(player, true);
				$scope.flexlist.push(player);
			}
		} else if(player.position == "DEF") {
			if($scope.deflist.length == 0) {
				adjustSalaryNumbers(player, true);
				$scope.deflist.push(player);
			} 
		}
	}

	$scope.removeFromLineup = function (player, flex) {
		adjustSalaryNumbers(player, false);
		if(flex == true) {
			$scope.flexlist = [];
		} else {
			if(player.position == "QB") {
				$scope.qblist = $scope.qblist.filter(function (el) {
					return el.name !== player.name;
				});
			} else if(player.position == "RB") {
				$scope.rblist = $scope.rblist.filter(function (el) {
					return el.name !== player.name;
				});
				if($scope.flexlist.length !== 0 && $scope.flexlist[0].position == "RB") {
					$scope.rblist.push($scope.flexlist[0]);
					$scope.flexlist = [];
				}
			} else if(player.position == "WR") {
				$scope.wrlist = $scope.wrlist.filter(function (el) {
					return el.name !== player.name;
				});
				if($scope.flexlist.length !== 0 && $scope.flexlist[0].position == "WR") {
					$scope.wrlist.push($scope.flexlist[0]);
					$scope.flexlist = [];
				}
			} else if(player.position == "TE") {
				$scope.telist = $scope.telist.filter(function (el) {
					return el.name !== player.name;
				});
				if($scope.flexlist.length !== 0 && $scope.flexlist[0].position == "TE") {
					$scope.telist.push($scope.flexlist[0]);
					$scope.flexlist = [];
				}
			} else if(player.position == "DEF") {
				$scope.deflist = $scope.deflist.filter(function (el) {
					return el.name !== player.name;
				});
			}
		}
	}

	function containsObject(obj, list) {
	    var i;
	    for (i = 0; i < list.length; i++) {
	        if (list[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}
});
