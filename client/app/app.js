'use strict';

angular.module('chatExpressApp',
  [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-storage',
    'btford.socket-io',
    'ui.bootstrap',
    'chatExpressApp.APIInterceptor',
    'chatExpressApp.userInfo',
    'chatExpressApp.localStorageService',
    'chatExpressApp.loginService',
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login.html',
        controller: 'LoginCtrl as vm'
      })
      .when('/signup', {
        templateUrl: 'app/signup.html',
        controller: 'LoginCtrl as vm'
      })
      .otherwise({
        redirectTo: '/login'
      });

      $httpProvider.interceptors.push('APIInterceptor');

      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };

    //TODO figure out how to use html5mode and not get no access token error
    $locationProvider.html5Mode(false);
  });
