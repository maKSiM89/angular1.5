;(function () {
	"use strict";

	angular.module('common')
		.service('MenuService', MenuService);

	MenuService.$inject = ['$http', 'ApiPath', '$q'];
	function MenuService($http, ApiPath, $q) {
		var service = this;
		service.getCategories = getCategories;
		service.getMenuItems = getMenuItems;
		service.getMenuItem = getMenuItem;

		function getCategories() {
		  return $http.get(ApiPath + '/categories.json').then(function (response) {
		    return response.data;
		  });
		}

		function getMenuItems(category) {
			var config = {};
			if (category) {
				config.params = {'category': category};
			}

			return $http.get(ApiPath + '/menu_items.json', config)
				.then(function (response) {
					return response.data;
				});
		}

		function getMenuItem( shortName ) {
			return $http.get(ApiPath + '/menu_items/' + shortName + '.json')
				.then( getMenuItemComplete )
				.catch( getMenuItemFailed );

			function getMenuItemComplete( response ) {
				return response.data;
			}

			function getMenuItemFailed( error ) {
				var newMessage = 'XHR Failed for getMenuItem';
				if (error.data && error.data.description) {
					newMessage = newMessage + '\n' + error.data.description;
				}
				error.data.description = newMessage;
				return $q.reject( error );
			}
		}
	}
})();
