'use strict';

// Declare app level module which depends on views, and components
angular.module('PlayerScoresApp', [
  'PlayerScoresApp.services',
  'PlayerScoresApp.controllers',
  'ngRoute',
  'PlayerScoresApp.view1',
  'PlayerScoresApp.view2',
  'PlayerScoresApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
