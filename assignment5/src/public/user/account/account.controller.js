;(function () {
	
	angular
		.module( 'public' )
		.controller( 'AccountController', AccountController );

	AccountController.$inject = ['UserService'];
	function AccountController( UserService ) {
		var ctrl = this;

		ctrl.userData = UserService.getUserData();
		console.log( ctrl.userData );
	}
})();