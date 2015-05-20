services.provider('sessionService', function ($rootScope, $window) {
	this.defaultDriver = 'test';

	this.$get = [function () {
		var driver = this.defaultDriver,
			drivers = this.drivers;
		return {
			useDriver: function (name) {
				if(drivers[name] && (!drivers[name].support  || drivers[name].support()))
					driver = name;
			},
			set: function (key, value, options) {
				var error;
				if (value == null) {
					value = 'null';
				}else
				if (typeof value === 'object') {
					value = angular.toJson(value);
				}
				value = value + '';

				return drive();
				try {
					return drivers[driver](key, value, options);
				} catch (e) {
					error = e;
					$rootScope.$emit('ERROR', {
						type: 'sessionService',
						driver: driver,
						key: key,
						value: value,
						error: error
					});
					return false;
				}
			},
			get: function (key, service) {
				var error, value, _ref, _ref1;
				if (!validKey(key, service)) {
					return false;
				}
				try {
					value = getStore[service = determineService(service)](key);
				} catch (_error) {
					error = _error;
					$rootScope.$emit('asStorage', {
						type: 'get-error',
						key: key,
						service: service,
						error: error
					});
					return false;
				}
				if (value && ((_ref = value.charAt(0)) === '{' || _ref === '[') && ((_ref1 = value.substr(-1)) === '}' || _ref1 === ']')) {
					return angular.fromJson(value);
				} else {
					return value;
				}
			},
			remove: function (key, service) {
				var error;
				if (!validKey(key, service)) {
					return false;
				}
				try {
					return removeStore[service = determineService(service)](key);
				} catch (_error) {
					error = _error;
					$rootScope.$emit('asStorage', {
						type: 'remove-error',
						key: key,
						service: service,
						error: error
					});
					return false;
				}
			},
			clear: function (service) {
				var error;
				try {
					return clearStore[service = determineService(service)]();
				} catch (_error) {
					error = _error;
					$rootScope.$emit('asStorage', {
					type: 'clear-error',
					service: service,
					error: error
					});
					return false;
				}
			}
		};

	}];

	this.drives = {
		test: {
			set: function (key, val) {
				return console.log('set:' + key + '&' + val);
			},
			get: function (key) {
				return console.log('get:' + key);
			},
			remove: function (key) {
				return console.log('remove:' + key);
			},
			clear: function () {
				return console.log('clear');
			},
			support: function () {
				console.log('support');
				return true;
			}
		},
		local: {
			set: function (key, val) {
				return $window.localStorage.setItem(key, val);
			},
			get: function (key) {
				return $window.localStorage.getItem(key);
			},
			remove: function (key) {
				return $window.localStorage.removeItem(key);
			},
			clear: function () {
				return $window.localStorage.clear();
			},
			support: function () {
				return !!$window.localStorage;
			}
		},
		session: {
			set: function (key, val) {
				return $window.sessionStorage.setItem(key, val);
			},
			get: function (key) {
				return $window.sessionStorage.getItem(key);
			},
			remove: function (key) {
				return $window.sessionStorage.removeItem(key);
			},
			clear: function () {
				return $window.sessionStorage.clear();
			},
			support: function () {
				return !!$window.sessionStorage;
			}
		},
		cookie: {
			set: function (key, val, options) {
				var domain, expire, path, secure;
				val = escape(val);
				if (key) {
					val = '' + key + '=' + val;
				}
				expire = cookieOptions.expire;
				path = cookieOptions.path;
				domain = cookieOptions.domain;
				secure = cookieOptions.secure;
				if (expire) {
					switch (expire.constructor) {
						case Number:
							if (expire === Infinity) {
								expire = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
							} else {
								expire = '; max-age=' + expire;
							}
						break;
						case String:
							expire = '; expires=' + expire; break;
						case Date:
							expire = '; expires=' + expire.toUTCString();
					}
					val += expire;
				}
				if (domain) {
					val += '; domain=' + domain;
				}
				if (path) {
					val += '; path=' + path;
				}
				if (secure) {
					val += '; secure';
				}
				$window.document.cookie = val;
				return val;
			},
			get: function (key) {
				var regexp, result, _ref;
				if (key) {
					regexp = new RegExp('(?:^' + key + '|;\\s*' + key + ')=(.*?)(?:;|$)', 'g');
					result = regexp.exec($window.document.cookie);
					result = result[1] === 'undefined' ? 'null' : result[1];
				} else {
					result = (_ref = $window.document.cookie.split(';')[0]) != null ? _ref : 'null';
				}
				return unescape(result);
			},
			remove: function (key) {
				if (getStore.cookie(key) !== 'null') {
					return setStore.cookie(key, '', { expire: 'Thu, 01 Jan 1970 00:00:00 GMT' });
				}

			},
			clear: function () {
				var cookie, cookies, _i, _len, _results;
				cookies = $window.document.cookie.split(';');
				_results = [];
				for (_i = 0, _len = cookies.length; _i < _len; _i++) {
					cookie = cookies[_i];
					if (cookie.indexOf('=') === -1) {
					removeStore.cookie();
					continue;
					}
					_results.push(removeStore.cookie(cookie.split('=')[0].trim()));
				}
				return _results;
			},
			support: function () {
				return !!$window.document.cookie;
			}
		}
	};

});
