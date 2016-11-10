;( function () {
	'use strict';

	angular
		.module( 'NarrowItDownApp', [] )
		.controller( 'NarrowItDownController', NarrowItDownController )
		.service( 'MenuSearchService', MenuSearchService )
		.constant( 'ApiBasePath', 'https://davids-restaurant.herokuapp.com' )
		.directive( 'foundItems', foundItemsDirective )
		.directive( 'loader', loaderDirective );

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController( MenuSearchService ) {
		var ctrl = this;

		ctrl.found = [];
		ctrl.initState = true;
		ctrl.isDataLoaded = true;
		ctrl.showResults = showResults;
		ctrl.removeItem = removeItem;
		ctrl.searchTerm = '';

		function showResults() {
			if ( ctrl.searchTerm !== '' ) {
				ctrl.isDataLoaded = false;
				var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

				promise
					.then(function (response) {
						ctrl.found = response;
						ctrl.initState = false;
						ctrl.isDataLoaded = true;
					})
					.catch(function (error) {
						ctrl.initState = false;
						ctrl.isDataLoaded = true;
						console.log("Something went terribly wrong.");
					});
			} else {
				ctrl.found = [];
				ctrl.initState = false;
			}
		}

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
		}

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
				onRemove: '&'
			},
			transclude: true
		};

		return ddo;
	}

	function loaderDirective() {
		var ddo = {
			templateUrl: 'loader/itemsloaderindicator.template.html'
		};

		return ddo;
	}
} )();