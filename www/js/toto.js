
var totoModule = angular.module("toto", [
	"ngRoute", "ngMaterial",
	"ApisModule"
 ])
.factory('totoAuthManager', [ '$rootScope', '$location', function($rootScope, $location) {
	return {
		request : function(config) {

			if (config.url.indexOf('/apis/') == -1) return config;

			config.headers['Authorization'] = 'Basic ' + apiBasicAuthToken;

			return config;
		},

		responseError : function(rejection) {

			return rejection;
		}
	};
} ])
.factory('googleSignInService', ['$rootScope', '$location', '$q', '$timeout', '$http', function($rootScope, $location, $q, $timeout, $http) {
	return {
		initGoogleSignIn : function() {
		}
	}
}])
.controller("totoController", function($scope, $route, $location, $mdMedia, $mdSidenav, $rootScope, $mdDialog, $http) {

	/**
	 * Function to navigate to another page
	 */
	$rootScope.go = function(path) {
		$location.path(path);
		$rootScope.selectedMenu = path;
	};

	/**
	 * Function that toggles the visibility of the navbar
	 */
	$scope.toggleNavbar = function(id) {
		$mdSidenav(id).toggle();
	}

	$rootScope.xs = $mdMedia('xs');
	$rootScope.sm = $mdMedia('sm');
	$rootScope.gtMd = $mdMedia('gt-md');
	$rootScope.gtXs = $mdMedia('gt-xs');
	$rootScope.screenIsDesktop = $mdMedia('gt-sm');
	$rootScope.selectedMenu = '/';

})
.config(function($httpProvider, $routeProvider, $locationProvider) {

	$httpProvider.interceptors.push('totoAuthManager');

	$routeProvider	.when('/', {templateUrl : 'html/apis.html', controller : 'ApisController'})
					// .when('/apis', {templateUrl : 'html/apis.html', controller : 'ApisController', resolve: {auth: function(googleSignInService) {return googleSignInService.initGoogleSignIn()}}})
					;

});
