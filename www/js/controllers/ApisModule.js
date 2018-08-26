var ApisModule = angular.module("ApisModule", ["APIListServiceModule", "CIReleaseServiceModule"]);

ApisModule.controller("ApisController", function($rootScope, $scope, $http, $timeout, $mdDialog, APIListService, CIReleaseService) {

	$scope.initContext = function() {

		$scope.getApis();

	}

	// Retrieve the list of APIs
	$scope.getApis = function() {

		APIListService.getAPIs().success(function(data, status, headers, config, statusText) {

				// Set the $scope variable
				$scope.apis = data.apis;

				$scope.smokeApis();

		});

	}

	// Smoke tests the APIs
	$scope.smokeApis = function() {

		for (var i = 0; i < $scope.apis.length; i++) {

			// Initialize APIs to "smoke failed"
			$scope.apis[i].smoke = false;

			// Smoke the API
			$scope.smokeApi($scope.apis[i].name);

		}
	}

	// Smoke the api
	// apiName is the simple name of the api (not the localhost, microservice host one)
	$scope.smokeApi = function(apiName) {

		APIListService.smokeAPI(apiName).success(function(data) {

			for (var j = 0; j < $scope.apis.length; j++) {

				if ($scope.apis[j].name == data.api) {
						$scope.apis[j].smoke = true;
						break;
				}
			}
		});
	}

	// Deploy the APIs
	$scope.deploy = function(api) {

		// Set the initial status of the API to 'deploying'
		api.status = 'DEPLOYING';

		// Trigger the release of the API
		CIReleaseService.deploy(api.localhost).success(function(data) {

			// Start polling to check the status of the API
			$scope.pollAPIStatus(api.localhost);

		});

	}

	// Polls the API Status (used during deploy to check the deploy state)
	$scope.pollAPIStatus = function(apiFullname) {

		CIReleaseService.getStatus(apiFullname).success(function(data) {

			// Update the status of the API
			updateAPIStatus(data);

			// Keep polling if the API hasn't been released
			if (data.status != 'RELEASED') $timeout(function() {$scope.pollAPIStatus(data.microservice);}, 3000);

			// If the API has been successfully released, try to smoke test it
			if (data.status == 'RELEASED') $timeout(function() {

				for (var i = 0; i < $scope.apis.length; i++) {

					if ($scope.apis[i].localhost == data.microservice) {

						$scope.smokeApi($scope.apis[i].name);
					}
				}

			}, 3000);

		});

	}

	// Updates the api status
	var updateAPIStatus = function(status) {

		for (var i = 0; i < $scope.apis.length; i++) {

			if ($scope.apis[i].localhost == status.microservice) {
				$scope.apis[i].status = status.status;
				$scope.apis[i].statusDesc = CIReleaseService.getStatusDescription(status.status);
				break;
			}
		}

	}

	$scope.initContext();

});
