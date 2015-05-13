var services = angular.module('lecal.services', []);
var directives = angular.module('lecal.directives', []);
var controllers = angular.module('lecal.controllers', []);
angular.module('lecal', ['lecal.services', 'lecal.directives','lecal.controllers']);