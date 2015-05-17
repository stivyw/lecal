
services.provider('Model', [function() {
    
		this.base = 'http://localhost/api/v1/';
		this.action = '';
    this.$get = ['$resource', function($resource) {

        var model = $resource(this.base + this.action + '/' + ':id', {id: '@id'});
        //model.prototype
       	return model;
    }];


}]);