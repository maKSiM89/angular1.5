;( function () {
	'use strict';

	angular.module( 'MenuApp' )
		.controller( 'ItemsController', ItemsController );

	ItemsController.$inject = ['categoryObject'];
	function ItemsController( categoryObject ) {
		var ctrl = this;
		ctrl.items = categoryObject.menu_items;
		ctrl.category = categoryObject.category;
	}

} )();
