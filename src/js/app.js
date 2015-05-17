/**
 * @require ./lecal.js
 * @require ./services/auth.js
*/

angular.module('App', ['lecal', 'ngResource'])

.controller('Ctrl', ['Auth', 'Model', function (Auth, Model) {
	var model = Model;
	console.log(Model.hello);
	Model.get({id:2}), function (x) {
		console.log(x);
	};
}]);