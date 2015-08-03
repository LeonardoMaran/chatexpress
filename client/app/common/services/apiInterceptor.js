'use strict';

angular
  .module('chatExpressApp.APIInterceptor', [])
  .factory('APIInterceptor', APIInterceptor);

  APIInterceptor.$inject = [
    'localStorageService',
    '$q',
    '$injector',
    'UserInfo'
  ];

  function APIInterceptor(localStorageService, $q, UserInfo, $location) {

    return {
        request: function (config) {
            var currentUser = localStorageService.getCurrentUser();
            if (currentUser == null) {
              console.log('No access token provided to attach to header');
            } else {
              console.log('Successfully attaching header');
              config.headers.authorization = 'Bearer ' + currentUser;
            }
            return config;
        },

        response: function (result) {
            return result;
        },

        responseError: function (rejection) {

          console.log('Failed with', rejection.status, 'status');
          UserInfo.removeDataUser();
          localStorageService.removeLocalStorage();
          $location.path('/login');
          
        }
    }
  };
