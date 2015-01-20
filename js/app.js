/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main mitch list app module
 *
 * @type {angular.Module}
 */
var mitch = angular.module('mitch', ['ngRoute']);

mitch.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
}]);

