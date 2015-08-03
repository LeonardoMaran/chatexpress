'use strict';

angular
  .module('chatExpressApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/chat', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl as vm'
      });
  });
