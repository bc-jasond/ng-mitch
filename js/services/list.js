var mitchServices = angular.module('mitchServices', ['ngResource']);

mitchServices.factory('List', ['$resource',
    function($resource){
        return $resource(
            'http://mitch:9000/list/:listId', {},
            {
                'create': { method: 'POST' },
                'update': { method: 'PUT' }
            }
        );
    }
]);
