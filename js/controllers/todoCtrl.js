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
		},
		items,
		title;

	$scope.list = angular.copy(backup);
	items = $scope.list.items;
	title = $scope.list.title;

	$scope.newItem = '';
	$scope.editedItem = null;
	$scope.editMode = false;

	// get rid of the annoying #, let's use HTML5 routing so we can have canonical URLs that get remembered
	if ($location.path() === '') {
		$location.path('/');
	}

	$scope.location = $location;

	$scope.handleButton = function() {
		if ($scope.editMode) {
			$scope.editMode = false;
		} else {
			$scope.logList();
		}
	}

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
		$scope.editMode = false;
		$scope.list = angular.copy(backup);
	};

	$scope.addItem = function () {
		var newItem = $scope.newItem.trim(),
			newId = 0;//Math.max.apply(null, list.items.map(function(e){ return e.id })) + 1;

		if (newItem.length === 0) {
			return;
		}

		items.push({
			id: newId,
			content: newItem
		});

		$scope.newItem = '';
	};

	$scope.editItem = function (item) {
		$scope.editedItem = item;
		// Clone the original item to restore it on demand.
		$scope.originalItem = angular.extend({}, item);
	};

	$scope.doneEditing = function (item) {
		// if we double clicked on a different item, don't set editedItem to null
		if (item.content === $scope.editedItem.content) {
			$scope.editedItem = null;
			item.content = item.content.trim();

			if (!item.content) {
				$scope.removeItem(item);
			}
		}
	};

	$scope.enterEditMode = function() {
		title = $scope.list.title;
		$scope.editedItem = null;
		$scope.editMode = true;
	}

	$scope.revertEditing = function (item) {
		var idx = items.indexOf(item);

		items[idx] = $scope.originalItem;
		$scope.doneEditing($scope.originalItem);
	};

	$scope.revertTitle = function() {
		$scope.list.title = title;
		$scope.editMode = false;
	}

	$scope.removeItem = function (item) {
		items.splice(items.indexOf(item), 1);
	};
});
