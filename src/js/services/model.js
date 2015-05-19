services.provider('Model', [function() {
		this.base = 'http://localhost/api/v1/';
		this.action = '';

		this.$get = ['$resource', function($resource) {

				//var model = $resource(this.base + this.action + '/' + ':id', {id: '@id'});
				var name, action, base = this.base;
				var model = $resource(action, {id: '@id'});


				return function(modelName, ext){
					name = modelName;
					action = base + this.action + '/' + ':id';
					console.log(action);
					var model = $resource(action, {id: '@id'});
					typeof ext === 'object' && angular.extend(model.prototype, ext);
					return model;
				};
		}];
}]);