#!/usr/bin/env node

var pkg     = require( './lib/packages' ),
	prop    = require( './lib/properties' ),

	config  = require( './lib/config' ),
	file    = require( './lib/file' ),
	walker  = require( './lib/walker' ),
	watcher = require( './lib/watcher' ),

	pwd;

function onfindconfig( config_path/*, stat*/ ) {
	var conf = config.get( config_path, pwd );

	console.log( 'found configuration and listening to: ', conf.__meta__.path );

	watcher.start( conf.__meta__.path, file.create, conf );

	file.create( conf );
}

module.exports = function catn8( path ) {
	pwd = pkg.path.resolve( process.cwd(), path );
	walker.start( pwd, onfindconfig );
};
