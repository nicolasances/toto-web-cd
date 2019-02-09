var APIListServiceModule = angular.module('APIListServiceModule', []);

APIListServiceModule.factory('APIListService', [ '$http', '$rootScope', '$location', '$mdDialog', function($http, $rootScope, $location, $mdDialog) {

	return {

		/**
		 * Returns the list of APIs available in Toto
		 */
		getAPIs : function() {

			return $http.get(apiUrl + '/api/list/apis');

		},

		/**
		 * Smoke tests the api
		 * Requires:
		 * - api : the name of the api (e.g. expenses) ATTENTION: not the full name
		 *
		 * Will return an {api: api name, status: 'running'}
		 */
		smokeAPI : function(api) {

			return $http.get(apiUrl + '/' + api.replace(/-/g, '/') + '/');

		}

	}

} ]);
