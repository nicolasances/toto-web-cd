var CIReleaseServiceModule = angular.module('CIReleaseServiceModule', []);

CIReleaseServiceModule.factory('CIReleaseService', [ '$http', '$rootScope', '$location', '$mdDialog', function($http, $rootScope, $location, $mdDialog) {

	return {

		/**
		 * Retrieves a user-friendly description of the CI Release Status code
		 *  - statusCode : e.g. DOCKER_RUN
		 */
		getStatusDescription : function(statusCode) {

			if (statusCode == 'STARTING') return 'Deploying';
			if (statusCode == 'GIT_PULL') return 'Pulling from Git';
			if (statusCode == 'DOCKER_BUILD') return 'Building image';
			if (statusCode == 'DOCKER_PUSH') return 'Pushing image';
			if (statusCode == 'DOCKER_RUN') return 'Starting microservice';
			if (statusCode == 'RELEASED') return 'Available';

		},

		/**
		 * Deploys an API.
		 * Requires :
		 *  - apiFullname : e.g. toto-nodems-expenses
		 */
		deploy : function(apiFullname) {

			var data = {
				microservice: apiFullname
			};

			return $http.post(apiUrl + '/release/releases', data);

		},

		/**
		* Checks the deployment status of an API.
		* Requires :
		*  - apiFullname : e.g. toto-nodems-expenses
		*/
		getStatus : function(apiFullname) {

			return $http.get(apiUrl + '/release/releases/' + apiFullname);

		}

	}

} ]);
