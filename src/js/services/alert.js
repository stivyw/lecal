services.provider('notifyService', [function() {
	this.title = '';
	this.message = '';
	this.icon = '';
	this.config = {
		warnning: {
			icon: 'W',
			color: 'yellow'
		}
	};

	this.$get = ['$resource', function($resource) {
		var config = this.config;
		return {
			show: function (mess, type) {
				var cfg = config[type] || config['warnning'];
				alert(cfg.icon + ': ' + mess);
			},
			warnning: function (mess) {
				return this.show(mess, 'warnning');
			},
			error: function (argument) {
				return this.show(mess, 'error');
			}
		};
	}];

	this.show = function (mess, type) {
//		if(typeof mess === 'object')

		var cfg = config[type] || config['warnning'];
		alert(cfg.icon + ': ' + mess);
	}
}]);
//TEST
//directives.directive('lclAlert',);
