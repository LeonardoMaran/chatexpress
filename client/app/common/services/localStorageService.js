/*
*
* Setter/getter service for tokens.
*
*/

'use strict';

angular
  .module('chatExpressApp.localStorageService', [])
  .factory('localStorageService', localStorageService);

  localStorageService.$inject = ['store'];

  function localStorageService(store) {

    var currentUser = null;

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      removeLocalStorage: removeLocalStorage
    };

    function setCurrentUser(user) {
        currentUser = user;
        store.set('user', user);
        return currentUser;
    };


    function getCurrentUser() {
      currentUser = store.get('user');
      if (currentUser == null) {
        return 'No storage'
      } else {
        return currentUser;
      }
    };

    function removeLocalStorage(){
      store.remove('user');
    }

  };
