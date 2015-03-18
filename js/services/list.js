var mitchServices = angular.module('mitchServices', ['ngResource']);

mitchServices.factory('List', ['$resource',
    function($resource){
        return $resource(
            'http://api:3000/lists/:listId', {},
            {
                'create': { method: 'POST' },
                'update': { method: 'PUT' }
            }
        );
    }
]);
