var pkg  = require( './packages' ),   // modules
	prop = require( './properties' );

function configure( callback, config_path, stat ) {
	var file_name = pkg.path.basename( config_path );

	if ( file_name !== prop.CONFIG_NAME )
		return;

	callback( config_path, stat );
}

module.exports = {
	start : function start_walking( root_path, callback ) {
		var walker = pkg.walkdir( root_path );
		walker.on( 'file', configure.bind( walker, callback ) );
		return walker;
	},
	stop  : function( walker ) {
		walker.end();
	}
};
