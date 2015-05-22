/**
 * @require ./lecal.js
 * @require ./services/auth.js
*/

angular.module('App', ['lecal', 'ngResource'])

.controller('Ctrl', ['$scope', '$http', 'authService', function ($scope, $http, Auth) {
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
		//$http.get('http://localhost:8000/api/');
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
			return $injector.get('AuthInterceptor');
		}
	]);
})
.factory('AuthInterceptor', function ($rootScope, $q, sessionService) {

  return {
		request: function (config) {
			//console.log(sessionService.get('tk'));
			console.log("Sending...");
			console.log(config);
			return config;
		},
		response: function (res) {
			console.log(res);

		},
		responseError: function (res) {
			document.body.innerHTML = res.data;
			console.log(res);
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