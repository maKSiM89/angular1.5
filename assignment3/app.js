;( function () {
	'use strict';

	angular
		.module( 'NarrowItDownApp', [] )
		.controller( 'NarrowItDownController', NarrowItDownController )
		.service( 'MenuSearchService', MenuSearchService )
		.constant( 'ApiBasePath', 'https://davids-restaurant.herokuapp.com' )
		.directive( 'foundItems', foundItemsDirective )
		.directive( 'loader', loaderDirective )

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController( MenuSearchService ) {
		var ctrl = this;

		ctrl.searchTerm = '';
		ctrl.found = [];
		ctrl.showResults = showResults;
		ctrl.removeItem = removeItem;
		ctrl.initState = true;

		function showResults() {
			if ( ctrl.searchTerm !== '' ) {
				var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

				ctrl.isDataLoaded = false;
				promise
					.then(function (response) {
						ctrl.found = response;
						ctrl.initState = false;
					})
					.catch(function (error) {
						ctrl.initState = false;
						console.log("Something went terribly wrong.");
					});
			}
		};

		function removeItem( index ) {
			ctrl.found.splice( index, 1 );
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService( $http, ApiBasePath ) {
		var service = this;
		service.getMatchedMenuItems = getMatchedMenuItems;

		function getMatchedMenuItems( searchTerm ) {
			return $http.get(
				ApiBasePath + "/menu_items.json"
			).then( function ( response ) {
				if ( typeof response.data.menu_items !== 'undefined' ) {
					return filterMenuItems( response.data.menu_items, searchTerm );
				}
			});
		};

		function filterMenuItems( items, searchTerm ) {
			var filteredItems = [];

			items.forEach( function ( item ) {
				if (
					typeof item.description !== 'undefined'
					&& item.description.indexOf( searchTerm ) !== -1
				) {
					filteredItems.push( item );
				}
			});

			return filteredItems;
		}
	}

	function foundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				foundResults: '<found',
				onRemove: '&',
				initState: '<'
			}
		};

		return ddo;
	}
} )();