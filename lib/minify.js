var pkg = require( './packages' );

module.exports = {
	'application/javascript' : function( file, content ) {
		try {
			return pkg.ugy.minify( file ).code;
		}             // in these case a create file has been triggered when the file is saved but not valid
		catch ( e ) { // todo: should we check if the file is in a valid state, period, before re-writing it?
			console.log( e );
			return null;
		}
	},
	'text/css'               : function( content ) {
		try { return pkg.clean_css.process( content ); }
		catch ( e ) { return null; }
	}
};



