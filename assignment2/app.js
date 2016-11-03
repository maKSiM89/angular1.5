;( function () {
	'use strict';

	angular
		.module( 'ShoppingListCheckOff', [] )
		.controller( 'ToBuyController', ToBuyController )
		.controller( 'AlreadyBoughtController', AlreadyBoughtController )
		.service( 'ShoppingListCheckOffService', ShoppingListCheckOffService );

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController( ShoppingListCheckOffService ) {
		var toBuyCtrl = this,
			service = ShoppingListCheckOffService;

		toBuyCtrl.items = service.getToBuyItems();
		toBuyCtrl.buyItem = function ( $index ) {
			service.buyItem( $index );
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController( ShoppingListCheckOffService ) {
		var boughtCtrl = this,
			service = ShoppingListCheckOffService;

		boughtCtrl.items = service.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this,
			toBuyItems = [
				{ name: "cookies", quantity: 10 },
				{ name: "apples", quantity: 20 },
				{ name: "bottles", quantity: 2 },
				{ name: "bread", quantity: 1 },
				{ name: "eggs", quantity: 30 }
			],
			boughtItems = [];

		service.getToBuyItems = function () {
			return toBuyItems;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		};

		service.buyItem = function ( $index ) {
			addItemToBoughtItems( $index );
			removeItemFromToBuyItems( $index );
		};

		function addItemToBoughtItems( $index ) {
			boughtItems.push( toBuyItems[$index] );
		};

		function removeItemFromToBuyItems( $index ) {
			toBuyItems.splice( $index, 1 );
		}
	}
} )();