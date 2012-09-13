var minify   = require( './minify' ),
	pkg      = require( './packages' ),   // modules
	prop     = require( './properties' ),
	template = require( './template' );

function create( file_contents, config ) {
	var charset   = config.encoding,
		file_dir  = config.target.dir,
		file_ext  = config.extension,
		file_name = pkg.path.resolve( file_dir, config.target.name );

	pkg.mkdirp( file_dir, 0777 );

	pkg.fs.writeFileSync( file_name + file_ext, file_contents, charset );

	if ( config.target.min && pkg.m8.nativeType( minify[config.type] ) == 'function' ) {
		if ( ( file_contents = minify[config.type]( file_contents ) ) !== null ) {
			pkg.fs.writeFileSync( file_name + '.min' + file_ext, file_contents, charset );
		}
	}

	console.log( 'file update: ', file_name );
}

function match_file( file_name ) {
	file_name = pkg.path.basename( file_name, this.extension );
	return this.source.match.test( file_name ) && !this.source.ignore.test( file_name ) ? file_name : null;
}

function meta_file( file_name ) {
	return file_name == prop.CONFIG_NAME || file_name == prop.FILE_BEGIN || file_name == prop.FILE_END;
}

function parse( file_list, config ) {
	var begin = process_file.call( config, prop.FILE_BEGIN, true, true ),
		end   = process_file.call( config, prop.FILE_END,   true, true );

	return template.parse( {
		begin     : begin || null,
		end       : end   || null,
		file_list : file_list
	} );
}

function process_file( file_name, ignore_not_found, dont_match ) {
	if ( dont_match !== true && meta_file( file_name ) ) return null;

	var file_path = pkg.path.join( this.source.dir, file_name ) + this.extension;

	if ( !pkg.fs.existsSync( file_path ) ) {
		if ( this.onfilenotfound === 'break' && ignore_not_found !== true )
			throw new Error( 'File not found: ' + file_path );
		else
			return null;
	}

	try {
		return {
			contents : pkg.fs.readFileSync( file_path ),
			path     : file_path.substring( this.__meta__.root_path.length + 1 )
		};
	}
	catch ( e ) {
		console.log( 'File – ', file_path,' – not found, even though it exists: ', e );
		return null;
	}
}

function process_files( config ) {
	return config.source.files.mapc( process_file, config );
}

function process_regexp( config ) {
	return pkg.fs.readdirSync( config.source.dir ).mapc( match_file, config ).mapc( process_file, config )
}

module.exports = {
	create : function( config ) {
		var file_list = Array.isArray( config.source.files )
					  ? process_files( config )
					  : process_regexp( config );

		create( parse( file_list, config ), config );
	}
};
