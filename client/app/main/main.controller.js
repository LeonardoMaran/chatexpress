'use strict';

angular
  .module('chatExpressApp')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http', 'UserInfo'];

  function MainCtrl($scope, $http, UserInfo) {

    var vm = this;

    activate();

    function activate() {
      vm.user = UserInfo.getDataUser();
    }
  };
