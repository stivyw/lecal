/**
 * @require ./storage.js
 */
services.provider('authService', function(){
	this.loginPath = '/auth/login';
	this.logoutPath = '/auth/logout';

	this.$get = ['$http', 'sessionService', function ($http, Session) {
		var loginPath = this.loginPath,
			logoutPath = this.logoutPath,
			token,
			user;


		return {
			getToken: function () {
				return token;
			},
			login: function(credentials){
				return $http.post(loginPath, credentials).then(function (response) {
					if(!response || !response.data)
						return;
					var tk = response.data.token;
					token = tk;
					if(tk){
						Session.set('tk', tk);
						if(response.user)
							user = response.user;
					}
					
				});
			},
			verify: function () {
				// body...
			},
			logout: function(){
				return $http.get(this.logoutPath).then(function () {
					Session.remove('tk');
				});
			},
//REVIEW
			loggued: function () {
				return !!Session.get('auth').user;
			},
			user: function () {
				return user;
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