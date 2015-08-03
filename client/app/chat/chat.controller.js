'use strict';

angular
  .module('chatExpressApp')
  .controller('ChatCtrl', ChatCtrl);

  ChatCtrl.$inject = ['$scope', '$http', 'Socket', 'UserInfo'];

  function ChatCtrl($scope, $http, Socket, UserInfo) {

    var vm = this;

    vm.sengMessage = sengMessage;
    vm.msg = [];
    vm.textM;

    activate();

    //------------//

    function activate() {
      vm.user = UserInfo.getDataUser();
      
      Socket.emit('request-messages', function() {
        // ... 
      });

      Socket.syncUpdates('all-msg', vm.msg, function(msg) {
        msg.forEach(function(mes){
          vm.msg.push(mes);
        });
      });
    }

    Socket.syncUpdates('chat message', vm.msg, function(msg) {
        vm.msg.push(msg);
    });

    $scope.$on('$locationChangeStart', function(event) {
      Socket.unsyncUpdates('chat message');
    });

    function sengMessage(stuff) {
      var newMsg = { username: vm.user, message: stuff }

      Socket.emit('chat message', newMsg, function (msg) {
        alert(msg);
      });

      vm.textM = '';
    }

  };
