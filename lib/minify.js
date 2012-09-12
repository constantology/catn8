var pkg = require( './packages' );

module.exports = {
	'application/javascript' : function( content ) {
		var jsp = pkg.ugy.parser, pro = pkg.ugy.uglify;
		return pro.gen_code( pro.ast_squeeze( pro.ast_mangle( jsp.parse( content ) ) ) );
	},
	'text/css'               : function( content ) {
		return pkg.clean_css.process( content );
	}
};



