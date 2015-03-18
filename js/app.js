/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main mitch list app module
 *
 * @type {angular.Module}
 */
var mitch = angular.module('mitch', ['ngRoute', 'ui.sortable', 'mitchServices']);

mitch.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider.
		when('/lists/:listId', {
			templateUrl: 'index.html',
			controller: 'ListCtrl'
		}).
		otherwise({
			redirectTo: '/lists/new'
		});

	$locationProvider.html5Mode(true);
}]);

