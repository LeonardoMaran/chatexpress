'use strict';

angular.module('chatExpressApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as vm'
      });
  });
