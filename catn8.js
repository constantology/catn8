#!/usr/bin/env node

var pkg     = require( './lib/packages' ),
	prop    = require( './lib/properties' ),

	config  = require( './lib/config' ),
	file    = require( './lib/file' ),
	walker  = require( './lib/walker' ),
	watcher = require( './lib/watcher' ),

	pwd,
	watching_config = {},
	watching_dir    = {};

function catn8( path ) {
	pwd = pkg.path.resolve( process.cwd(), path );

	var walkies = walker.start( pwd, onfindconfig );
	walkies.on( 'directory', onfinddir );

	onfinddir( pwd, ondirchange );
}


function onchange( conf ) {
	if ( !validate( conf ) ) {
		console.log( 'configuration no longer valid, closing watcher: ', conf );
		conf.__meta__.watcher.close();
		return;
	}

	file.create( conf );
}

function ondirchange( dir_path, event, file_name ) {
	if ( !pkg.fs.existsSync( dir_path ) ) // make sure the directory was not removed
		return;

	console.log( 'dir change: ', arguments );
	catn8( dir_path );
}

function onfindconfig( config_path/*, stat*/ ) {
	if ( watching_config[config_path] )
		return;

	var conf = config.get( config_path, pwd );

	if ( conf === null ) // in the event that a config was created but not yet ready, we don't want to conitnue just yet.
		return;

	console.log( 'found configuration and listening to: ', conf.__meta__.pwd );

	conf.__meta__.watcher           =
	watching_config[config_path]    =
	watching_dir[conf.__meta__.pwd] =
	watching_dir[conf.source.dir]   = watcher.start( conf.source.dir, onchange, conf );

	file.create( conf );
}

function onfinddir( dir_path, stat ) {
	if ( watching_dir[dir_path] || !!~dir_path.indexOf( '/.' ) )
		return;

	watching_dir[dir_path] = watcher.start( dir_path, ondirchange, dir_path );
}

function validate( conf ) {
	var fs = pkg.fs;
	return fs.existsSync( conf.__meta__.pwd ) && fs.existsSync( conf.source.dir ) && fs.existsSync( conf.target.dir );
}

module.exports = catn8;
