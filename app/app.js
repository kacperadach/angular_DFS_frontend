'use strict';

// Declare app level module which depends on views, and components
var myModule = angular.module('PlayerScoresApp', [
  'PlayerScoresApp.services',
  'PlayerScoresApp.controllers',
]);

myModule
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});