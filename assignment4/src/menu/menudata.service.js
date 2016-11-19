;(function () {

	angular.module('Data')
		.factory( 'MenuDataService', MenuDataService )
		.constant( 'ApiCategoriesBasePath', 'https://davids-restaurant.herokuapp.com/categories.json' )
		.constant( 'ApiMenuItemsBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json' );

	MenuDataService.$inject = ['$http', 'ApiCategoriesBasePath', 'ApiMenuItemsBasePath'];
	function MenuDataService( $http, ApiCategoriesBasePath, ApiMenuItemsBasePath ) {
		return {
			getAllCategories: getAllCategories,
			getItemsForCategory: getItemsForCategory
		};

		function getAllCategories() {
			return $http.get(
				ApiCategoriesBasePath
			).then( function ( response ) {
				if ( typeof response.data !== 'undefined' ) {
					return response.data;
				}
			});
		}
		
		function getItemsForCategory( categoryShortName ) {
			return $http.get(
				ApiMenuItemsBasePath + '?category=' + categoryShortName
			).then( function ( response ) {
				if ( typeof response.data !== 'undefined' ) {
					return response.data;
				}
			});
		}
	}
})();