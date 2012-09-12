var pkg               = require( './packages' ),   // modules
	prop              = require( './properties' ),
	re_ignore_default = /:/,
	re_match_default  = /.*/;

function default_config() {
	return try_and_parse( pkg.fs.readFileSync( prop.PATH_DEFAULT_CONFIG ) );
}

function resolve_dir( dir, config ) {
	return pkg.path.resolve( config.__meta__.path, dir.gsub( { cwd : config.__meta__.root } ) );
}

function resolve_name( config ) {
	var path = config.source.dir.split( pkg.path.sep );
		path = path.slice( path.length - config.__meta__.depth ).join( '.' );

	return config.target.name.gsub( { dirname : pkg.path.basename( path ) } );
}

function try_and_parse( data ) {
	try { return JSON.parse( data ); }
	catch ( e ) {
		console.log( "Error trying to JSON.parse: ", data );
		throw e;
	}
}

module.exports = {
	get   : function get_config( config_path, root_path ) {
		var config = pkg.fs.readFileSync( config_path ),
			meta,
			path   = pkg.path;

		if ( !config )
			console.log( 'No .catn8 config file found at: ', config_path );

		config     = pkg.m8.merge( default_config(), ( config ? try_and_parse( config ) : {} ) );
		meta       = {
			path : path.dirname( config_path ),
			root : root_path
		};
		meta.depth = meta.path.split( path.sep ).length - meta.root.split( path.sep ).length;

		config.__meta__    = meta;
		config.extension   = '.' + pkg.mime.extension( config.type );

		config.source.dir  = resolve_dir( config.source.dir, config );

		if ( Array.isArray( config.source.files ) ) {
			delete config.source.ignore;
			delete config.source.match;
		}
		else {
			if ( config.source.ignore )
				config.source.ignore = new RegExp( config.source.ignore, 'i' );
			else
				config.source.ignore = re_ignore_default;

			if ( config.source.match )
				config.source.match  = new RegExp( config.source.match,  'i' );
			else
				config.source.match  = re_match_default;
		}

		config.target.dir  = resolve_dir( config.target.dir, config );
		config.target.name = resolve_name( config );

		return config;
	},
	parse : try_and_parse
};
