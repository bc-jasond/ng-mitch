/*global mitch, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the "blank" service
 * - exposes the model to the template and provides event handlers
 */
mitch.controller('ListCtrl', function ListCtrl($scope, $location) {

	/**
	 * hard-code the list here in the controller for now
	 */
	var backup = {
			id: 1,
			title: "Sample List Title",
			items: [
				{ id: 40, content: "cheese" },
				{ id: 41, content: "pepperoni" },
				{ id: 42, content: "olives" },
				{ id: 43, content: "anchovies" },
				{ id: 44, content: "mushrooms" }
			]
		};

	$scope.list = angular.copy(backup);

	// get rid of the annoying #
	if ($location.path() === '') {
		$location.path('/');
	}

	$scope.location = $location;

	/**
	 * when the user clicks 'Vote' simply log the list object for now
	 */
	$scope.logList = function() {
		console.log('list id: ' + $scope.list.id + ', list title: ' + $scope.list.title);
		$scope.list.items.map(function(e, i){
			console.log('position: ' + i + ', id: ' + e.id + ', ' + e.content);
		});
	};

	$scope.toBackup = function() {
		$scope.list = angular.copy(backup);
	}
});
