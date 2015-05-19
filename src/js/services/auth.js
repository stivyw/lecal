/**
 * @require ./storage.js
 */
services.provider('authService', function(){
	this.loginPath = '/login';
	this.logoutPath = '/logout';

	this.$get = ['$http', function ($http) {
		var loginPath = this.loginPath;
		var logoutPath = this.logoutPath;
		return {
			login: function(credentials){
				console.log(credentials);
				return $http.post(loginPath, credentials).then(function (response) {
					console.log(response);
				});
			},
			logout: function(){
				return 'Você saiu';
			},
//REVIEW
			loggued: function () {
				return !!Session.userId;
			},
			authorized: function (authorizedRoles) {
				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
				return (authService.isAuthenticated() &&
					authorizedRoles.indexOf(Session.userRole) !== -1);
			}
		};
	}];
});