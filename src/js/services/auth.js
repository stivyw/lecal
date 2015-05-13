/**
 * @require ./config.js
 */
services.service('Auth', function(){
	return {
		getHello: function(){
			return 'Hello';
		}
	};
});