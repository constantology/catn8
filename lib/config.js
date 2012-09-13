var pkg               = require( './packages' ),   // modules
	prop              = require( './properties' ),
	re_ignore_default = /:/,
	re_match_default  = /.*/;

function default_config() {
	return try_and_parse( pkg.fs.readFileSync( prop.PATH_DEFAULT_CONFIG ) );
}

function resolve_dir( dir, config ) {
	var meta = config.__meta__;
	return pkg.path.resolve( meta.pwd, dir.gsub( meta ) );
}

function resolve_name( config ) {
	return config.target.name.gsub( config.__meta__ );
}

function try_and_read( file_path ) {
	try {
		var file_contents = pkg.fs.readFileSync( file_path );
		return file_contents.length > 0 ? file_contents : null;
	}
	catch( e ) { return null; }
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
		var config = try_and_read( config_path ),
			meta, path = pkg.path;

		if ( config === null ) // in the event that a config was created but not yet ready, we don't want to conitnue just yet.
			return config;

		meta   = {
			pwd       : path.dirname( config_path ),
			root_path : root_path
		};

		if ( !config )
			console.log( 'No .catn8 config file found at: ', config_path );

		config     = pkg.m8.merge( default_config(), ( config ? try_and_parse( config ) : {} ) );
		meta.depth = meta.pwd.split( path.sep ).length - meta.root_path.split( path.sep ).length;
		meta.name  = path.basename( meta.pwd );

		config.__meta__   = meta;
		config.extension  = '.' + pkg.mime.extension( config.type );

		config.source.dir = resolve_dir( config.source.dir, config );

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
