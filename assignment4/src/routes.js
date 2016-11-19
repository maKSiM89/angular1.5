;(function () {
	'use strict';

	angular.module('MenuApp')
		.config( RoutesConfig );

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.otherwise('/');

		$stateProvider
			.state( 'home', {
                url: '/',
                templateUrl: 'src/menu/menu.template.html'
            })
			.state( 'categories', {
                url: '/categories',
                templateUrl: 'src/menu/categories/categories-list.template.html',
				controller: 'CategoriesController as ctrl',
				resolve: {
			      categoriesList: ['MenuDataService', function ( MenuDataService ) {
			        return MenuDataService.getAllCategories();
			      }]
			    }
            })
			.state('items', {
			    url: '/items/{categoryID}',
			    templateUrl: 'src/menu/items/items.template.html',
				controller: 'ItemsController as ctrl',
				resolve: {
					categoryObject: ['$stateParams', 'MenuDataService',
						function ($stateParams, MenuDataService) {
							return MenuDataService.getItemsForCategory( $stateParams['categoryID'] )
						}
					]
				}
			});
	}
})();