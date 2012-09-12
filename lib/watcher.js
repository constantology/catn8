var pkg  = require( './packages' ),   // modules
	prop = require( './properties' );

module.exports = {
	start : function start_watching( file_path, callback ) {
		var args    = Array.coerce( arguments, 2 ),
			watcher = pkg.fs.watch( file_path, pkg.m8.noop );

		args.unshift( watcher );

		watcher.on( 'change', callback.bind.apply( callback, args ) );

		return watcher;
	}
};
