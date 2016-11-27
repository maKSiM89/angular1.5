;(function () {
	
	angular
		.module( 'public' )
		.controller( 'RegisterController', RegisterController );

	RegisterController.$inject = ['MenuService' , 'UserService'];
	function RegisterController( MenuService, UserService ) {
		var ctrl = this,
			userService = UserService;

		ctrl.submit = submit;
		ctrl.user = {};

		function submit() {
			ctrl.completed = false;
			ctrl.error = false;

			if ( ctrl.user.menu_number ) {
				MenuService.getMenuItem( ctrl.user.menu_number )
					.then( function ( response ) {
						console.log( ctrl.user );
						ctrl.user.menu_dish = response;
						console.log( ctrl.user );
						UserService.setUserData( ctrl.user );
						ctrl.completed = true;
					})
					.catch( function () {
						ctrl.error = true;
					});
			} else {
				ctrl.error = true;
			}
		}
	}
})();