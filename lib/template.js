var Templ8 = require( 'Templ8' );

module.exports = new Templ8( '{{begin.contents if begin|exists}}',
	'{% for file in file_list %}',
		'\n/*~  {{ file.path }}  ~*/\n',
		'{{ file.contents if file.contents|exists }}',
	'{% forempty %}',
		'\n/*~  NO FILES FOUND  ~*/\n',
	'{% endfor %}',
	'\n{{end.contents if end|exists}}', {
		compiled : true,
		id       : 'catn8r'
	} );
