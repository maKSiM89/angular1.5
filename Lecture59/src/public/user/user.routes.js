(function() {
	'use strict';

	angular.module('public')
		.config( routeConfig );

	/**
	* Configures the routes and views for user section
	*/
	routeConfig.$inject = ['$stateProvider'];
	function routeConfig ( $stateProvider ) {
		// Routes
		$stateProvider
			.state('public.register', {
				url: '/register',
				templateUrl: 'src/public/user/register/register.template.html',
				controller: 'RegisterController',
				controllerAs: 'ctrl'
			})
			.state('public.account', {
				url: '/account',
				templateUrl: 'src/public/user/account/account.template.html',
				controller: 'AccountController',
				controllerAs: 'ctrl'
			});
	}
})();
