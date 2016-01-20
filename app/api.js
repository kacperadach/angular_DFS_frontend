function Hello($scope, $http) {
    $http.get('http://0.0.0.0:8001/QB/?format=json').
        success(function(data) {
            $scope.quarterbacks = data.data;
        });
}