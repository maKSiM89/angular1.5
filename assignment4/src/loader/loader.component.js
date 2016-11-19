;( function () {
	'use strict';

	angular.module( 'Loader' )
	    .component( 'loader', {
	        templateUrl: 'src/loader/loader.template.html',
	        controller: LoaderController
	    } );

	LoaderController.$inject = ['$rootScope'];
	function LoaderController( $rootScope ) {
		var $ctrl = this,
			canceler,
			cancellers = [];

		$ctrl.$onInit = function () {
			canceler = $rootScope.$on( '$stateChangeStart', function() {
				$ctrl.showLoader = true;
			} );
			cancellers.push( canceler );

			canceler = $rootScope.$on( '$stateChangeSuccess', function() {
				$ctrl.showLoader = false;
			} );
		    cancellers.push( canceler );

		    canceler = $rootScope.$on( '$stateChangeError', function(){
		        $ctrl.showLoader = false;
		    });
		    cancellers.push( canceler );
		};

		$ctrl.$onDestroy = function () {
			cancellers.forEach( function ( canceler ) {
				canceler();
			});
		};
	}
})();
