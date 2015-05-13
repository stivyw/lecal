/**
  * @require ./lecal.js
  * @require ./services/auth.js
 */
 App = angular.module('App', ['lecal']);
 App.controller('Ctrl', ['Auth', function (Auth) {
 	console.log(Auth.getHello());
 }]);