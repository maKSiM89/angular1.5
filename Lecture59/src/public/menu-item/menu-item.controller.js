;(function (global) {

	angular.module('public')
		.controller('MenuItemController', MenuItemController);


	MenuItemController.$inject = ['ApiPath'];
	function MenuItemController( ApiPath ) {
		var $ctrl = this;

		$ctrl.basePath = ApiPath;

		console.log( $ctrl );
	}
})(window);