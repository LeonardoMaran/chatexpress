/* global io */
'use strict';

angular
  .module('chatExpressApp')
  .factory('Socket', function (socketFactory) {

    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });


    return {
      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;

        socket.on(modelName, function (item) {
          cb(item);
        });
      },
      emit: function (modelName, data, cb) {
        console.log(data);

        cb = cb || angular.noop;
        socket.emit(modelName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (cb) {
              cb.apply(socket, args);
            }
          });
        });
      },
      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        console.log('disconnecting the dude from a socket');
        socket.removeAllListeners(modelName);
        // socket.disconnect(true);
      }
      // getAll
    };
  });