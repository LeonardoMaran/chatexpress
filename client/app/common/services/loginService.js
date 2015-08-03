'use strict';

angular
  .module('chatExpressApp.loginService', [])
  .factory('loginService', loginService);

  loginService.$inject = ['$http', '$q'];

  function loginService($http, $q) {

    return {
      signIn: signIn,
      signup: signup
    }

    function signIn(userObject){
      var deffer = $q.defer();
      $http
        .post('/authenticate', userObject)
        .success(success)
        .error(error);

      function success(data) {
        deffer.resolve(data);
      }

      function error(error) {
        deffer.reject(error);
      }

      return deffer.promise;
    }

    function signup(userObject){
      var deffer = $q.defer();
      $http
        .post('/signup', userObject)
        .success(success)
        .error(error);

      function success(data) {
        deffer.resolve(data);
      }

      function error(error) {
        deffer.reject(data);
      }

      return deffer.promise;
    }
  };
