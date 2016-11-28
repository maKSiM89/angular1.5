;(function () {

	angular
		.module( 'common' )
		.factory( 'UserService', UserService );

	function UserService() {
		var data;
		return {
			getUserData: getUserData,
			setUserData: setUserData
		};

		function getUserData() {
			return data;
		}

		function setUserData( userData ) {
			data = userData;
		}
	}
})();