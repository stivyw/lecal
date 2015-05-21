/**
 * @require ./lecal.js
 * @require ./services/auth.js
*/

angular.module('App', ['lecal', 'ngResource'])

.controller('Ctrl', ['$scope', 'authService', function ($scope, Auth) {
//	var model = Model('teste');

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
	$scope.login({
		user: 'stivyw@gmail.com',
		pass: '123456'
	});

}])
.config(function (authServiceProvider, $httpProvider) {
	authServiceProvider.loginPath = 'http://localhost:8000/auth/login'
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			console.log("interceptor");

			return {
				response: function (argument) {
					console.log(argument);
				},
				responseError: function (response) {
					console.log("ReponseError");
					console.log(response);
				}
			};
			return $injector.get('AuthInterceptor');
		}
	]);
})
.factory('AuthInterceptor', function ($rootScope, $q) {
  return {
    responseError: function (response) { 
    	console.log(response);
    }
  };
})
.run(function ($rootScope) {
	$rootScope.$on('ERROR',  function (e, next) {
		console.log(next);
	});
});
var tm = 200;
setTimeout(function () {
	window.location.reload();
}, tm * 1000);