/*global mitch, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the "blank" service
 * - exposes the model to the template and provides event handlers
 */
mitch.controller('ListCtrl', function ListCtrl($scope, $location, $route, $routeParams, List) {

	var newlist = {
			id: 0,
			title: "",
			items: []
		},
		backup,
		items,
		title,
		resolveList = function(list) {
			$scope.list = list;
			backup = angular.copy($scope.list);
			items = $scope.list.items;
			title = $scope.list.title;
		};

	$scope.newItem = '';
	$scope.editedItem = null;
	$scope.editMode = false;

	$scope.$on('$routeChangeSuccess', function() {
		var id = $routeParams.listId;
		// id is undefined because first the /lists route fires a routeChangeSuccess and we need to ignore that
		if (id === 'new') {
			resolveList(newlist);
			$scope.enterEditMode();
		} else if (id !== undefined) {
			List.get({ listId: $routeParams.listId }, resolveList);
		}
	});

	$scope.saveList = function() {
		$scope.editMode = false;
		if ($scope.list.id === 0) {
			// create will POST to create a new list
			List.create({}, $scope.list,
				function(response) {
					// rewrite the URL to reflect the new id, it will cause a new GET to /lists/:listId
					// this is unfortunate, because we already have the data in the response from the POST
					$location.path('/list/' + response.id);
				},
				function(httpResponse) {
					// error handling? retry?
				}
			);
		} else {
			// update will PUT to save an existing list
			List.update({ listId: $scope.list.id }, $scope.list, resolveList,
				function(httpResponse) {
					// error handling? retry?
				}
			);
		}
	};

	$scope.handleButton = function() {
		if ($scope.editMode) {
			$scope.addItem();
			$scope.saveList();
		} else {
			$scope.logList();
		}
	};

	$scope.enterEditMode = function() {
		title = $scope.list.title;
		$scope.editedItem = null;
		$scope.editMode = true;
	};

	$scope.revertChanges = function() {
		if ($routeParams.listId === 'new') { return; }
		$scope.editMode = false;
		$scope.list = angular.copy(backup);
	};

	$scope.revertTitle = function() {
		$scope.list.title = title;
		$scope.editMode = false;
	};

	/**
	 * when the user clicks 'Vote' simply log the list object for now
	 */
	$scope.logList = function() {
		console.log('list id: ' + $scope.list.id + ', list title: ' + $scope.list.title);
		$scope.list.items.map(function(e, i){
			console.log('position: ' + i + ', id: ' + e.id + ', ' + e.content);
		});
	};

	$scope.addItem = function () {
		var newItem = $scope.newItem.trim();

		if (newItem.length === 0) { return; }

		items.push({ id: 0, content: newItem });
		$scope.newItem = '';
	};

	$scope.editItem = function (item) {
		$scope.editedItem = item;
		// Clone the original item to restore it on demand.
		$scope.originalItem = angular.extend({}, item);
	};

	$scope.doneEditing = function (item) {
		// HACK: jQuery and angular don't play nice, double event firing causes this to be called twice in a row
		// ui.sortable is easy, but probably needs to be swapped out for an angular directive
		if ($scope.editedItem === null) { return; }
		// if we double clicked on a different item, don't set editedItem to null
		if (item.content === $scope.editedItem.content) {
			$scope.editedItem = null;
			item.content = item.content.trim();

			if (!item.content) {
				$scope.removeItem(item);
			}
		}
	};

	$scope.revertEditing = function (item) {
		var idx = items.indexOf(item);

		items[idx] = $scope.originalItem;
		$scope.doneEditing($scope.originalItem);
	};

	$scope.removeItem = function (item) {
		items.splice(items.indexOf(item), 1);
	};
});
