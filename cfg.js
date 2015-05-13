var cfg = {
	env: process.env.ENV || 'development',
	output: 'builds/{environment}',
	sass: {
		development: {
			sourceComments: 'map'
		},
		production: {
			outputStyle: 'compressed'
		}
	},
	alias: {
		production: 'env'
	}
};
var reserved = ['alias'];
var CONF = function(key, value){
	var k = key.split('.'), o = cfg, i=0;

	if(reserved.indexOf(k[0]) != -1)
		throw new Error("Parametro '" + k[0] + "' é reservado para config. ");
	key = k[i];
	do{
		o = o[key];
		key = k[++i];
		if(typeof o != 'object'){
			value = null;
			break;
		}
	}while(i<k.length-1);

	if(value){
		return o[key] = value;
	}
	return null;
};
CONF.get = function(){
	return cfg;
};
CONF.process = function(str){
	if(typeof str === 'string'){
		var value = str, 
			vars = value.match(/\{[A-z]{1,}\}/g);
		
		vars.forEach(function(v){
			v = v.substring(1, v.length-1);
			var config = CONF(v);
			str = value.replace(v, typeof config === 'string' ? config : '');
		});
	}
	return str;
};

process.argv.slice(2).forEach(function(arg){
	if(/^--[A-z]{1,}/.test(arg)){
		var res = arg.substring(2).split('='),
			key = res[0],
			val;
		if(cfg.alias[key])
		{
			val = key;
			key = cfg.alias[key];
		}else
			val = res[1] || true;

		//cfg[key] = val;
		CONF(key, val);
	}
});
module.exports = CONF;