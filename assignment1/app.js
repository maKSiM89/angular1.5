;(function () {
	'use strict';

	angular
		.module('LunchChecker', [])
		.controller('LunchCheckerController', LunchCheckerController);

	LunchCheckerController.$inject = ['$scope'];
	function LunchCheckerController($scope) {
		$scope.dishes = '';
		$scope.message = '';
		$scope.messageClass = '';
		$scope.checkIfTooMuchItems = checkIfTooMuchItems;

		const emptyClass = 'empty';
		const filledClass = 'filled';
		
		function checkIfTooMuchItems() {
			var lunchItemsCount = getLunchItemsCount(),
				message = '';

			if ( lunchItemsCount < 1 ) {
				showMessage('Please enter data first', emptyClass);
			} else if ( lunchItemsCount <= 3) {
				showMessage('Enjoy!', filledClass);
			} else {
				showMessage('Too much!', filledClass);
			}
		}

		function getLunchItemsCount() {
			var count = 0, items;

			if ($scope.dishes !== '') {
				items = $scope.dishes.split(', ');

				items.forEach( function ( item ) {
					if ( item !== '' ) {
						count++;
					}
				});
			}

			return count;
		}
		
		function showMessage( message, htmlClass ) {
			$scope.message = message;
			$scope.messageClass = htmlClass;
		}
	}
})();