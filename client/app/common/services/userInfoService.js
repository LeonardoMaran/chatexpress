/*
*
* Service for storing basic information about a user like username etc.
*
*/

'use strict';

angular
  .module('chatExpressApp.userInfo', [])
  .factory('UserInfo', UserInfo);

  UserInfo.$inject = ['store'];

  function UserInfo(store) {

    var currentUserInfo = null;

    return {
      setDataUser: setDataUser,
      getDataUser: getDataUser,
      removeDataUser: removeDataUser
    }

    function setDataUser(user){
      store.set('userInfo', user);
      return user;
    }

    function getDataUser() {
      currentUserInfo = store.get('userInfo');
      if (currentUserInfo == null) {
        return 'No storage info for users info';
      } else {
        return currentUserInfo;
      }
    }

    function removeDataUser(){
      store.remove('userInfo');
    }
  };
