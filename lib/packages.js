module.exports = {
	fs        : require( 'fs' ),        // node modules
	path      : require( 'path' ),
	util      : require( 'util' ),

	Templ8    : require( 'Templ8' ),    // npm modules
	clean_css : require( 'clean-css' ),
	mime      : require( 'mime' ),
	mkdirp    : require( 'mkdirp' ),
	n8iv      : require( 'n8iv' ),
	ugy       : require( 'uglify-js' ),
	walkdir   : require( 'walkdir' )
};

module.exports.m8 = module.exports.n8iv( Object, Array, Boolean, Function, Number, String ).m8;

require( 'd8/locale/en-GB' );
require( 'd8' );
