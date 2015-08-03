'use strict';

angular
  .module('chatExpressApp')
  .controller('NavbarCtrl', NavbarCtrl)

  NavbarCtrl.$inject = ['$scope', '$location', 'localStorageService'];

  function NavbarCtrl($scope, $location, localStorageService) {

    activate();

    function activate() {
      var currentUser = localStorageService.getCurrentUser();
      if(currentUser == 'No storage') {
        $scope.menu = [
          {
          'title': 'Login',
          'link': '#/login'
          },
          {
            'title': 'Signup',
            'link': '#/signup'
          }
        ];
      } else {
        $scope.menu = [
          {
          'title': 'Home',
          'link': '#/home'
          },
          {
          'title': 'Join Chat!',
          'link': '#/chat'
          }
        ];
      }
    }

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  };
