;( function () {
	'use strict';

	angular
		.module( 'MenuApp')
		.component('categoriesList', {
			templateUrl: 'src/menu/categories/categories.template.html',
			bindings: {
				categories: '<'
			}
	});

} )();