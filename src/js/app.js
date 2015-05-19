/**
 * @require ./lecal.js
 * @require ./services/auth.js
*/

angular.module('App', ['lecal', 'ngResource'])

.controller('Ctrl', ['$scope', 'authService', 'notifyService', function ($scope, Auth, Notify) {
//	var model = Model('teste');

	//alertService.show('É um teste para o notify');
	$scope.login = function (credentials) {
		Auth.login(credentials).then(function (user) {
			//$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			console.log('Login success');
			console.log(user);
		}, function () {
			//$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			console.log('Login Error');
		});
	};
	$scope.login();

}])
.config(function (authServiceProvider) {
	authServiceProvider.loginPath = 'http://localhost:8000/login'
	
});
var tm = 1000;
setTimeout(function () {
	window.location.reload();
}, tm * 1000);