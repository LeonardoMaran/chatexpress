'use strict';

angular
  .module('chatExpressApp')
  .controller('LoginCtrl', LoginCtrl)

  LoginCtrl.$inject = [
    '$scope',
    '$http',
    '$location',
    'loginService',
    'UserInfo',
    'localStorageService'
  ];

  function LoginCtrl($scope, $http, $location, loginService, UserInfo, localStorageService) {
    var vm = this;

    vm.signIn = signIn;
    vm.userLoginInfo = {};
    vm.userCreateObject = {};
    vm.signUp = signUp;

    activate();

    //----------------//

    function activate() {
      // ...
    }

    function signIn(userLoginInfo) {
      loginService.signIn(userLoginInfo).then(success, error);

      function success(data){
        if(data.success == false) {
          alert('Problem with logging in!');
        } else {
          console.log(data);
          localStorageService.setCurrentUser(data.token);
          UserInfo.setDataUser(data.user);
          console.log(data.user);
          vm.userLoginInfo = {};
          $location.path('/home');
          alert('Successfully signed in');
        }
      };

      function error(err){
        vm.userLoginInfo = {};
        alert('Problem with logging in!');
      };

    }

    function signUp(userCreateObject) {
      loginService.signup(userCreateObject).then(success, error);

      function success(data){
        if(data.success == false) {
          alert('Problem with signing up!');
        } else {
          localStorageService.setCurrentUser(data.token);
          UserInfo.setDataUser(data.user);
          vm.userLoginInfo = {};
          $location.path('/home');
          alert('Successfully signed up');
        }
      };

      function error(err){
        vm.userLoginInfo = {};
        alert(err);
      };
    }
  };
