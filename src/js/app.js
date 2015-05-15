/**
  * @require ./lecal.js
  * @require ./services/auth.js
 */
 require('./lecal');
 App = angular.module('App', ['lecal']);
 App.controller('Ctrl', ['Auth', function (Auth) {
 	console.log(Auth.getHello());
 }]);