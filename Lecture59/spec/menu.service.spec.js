describe('menu', function () {

	var menuService, $httpBackend, ApiBasePath;

	beforeEach( function () {
		module( 'restaurant' );

		inject( function ( $injector ) {
			menuService = $injector.get( 'MenuService' );
			$httpBackend = $injector.get( '$httpBackend' );
			ApiBasePath = $injector.get( 'ApiBasePath' );
		});
	});

	it('should determine that menu item(A1) is exist', function() {
		$httpBackend.whenGET(ApiBasePath + '/menu_items/A1.json')
			.respond([{"id":1,"short_name":"A1"}]);

		menuService.getMenuItem( 'A1' )
			.then(function(response) {
				expect(response.data).toEqual([{"id":1,"short_name":"A1"}]);
			});

		$httpBackend.flush();
	});

});
