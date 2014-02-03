/*
 * grunt-init-freestone
 * https://gruntjs.com/
 *
 */

'use strict';

//var _ = require('underscore')._;

// Basic template description.
exports.description = 'Create a Freestone Project, with less and jquery.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Oubliez pas d\'installer avec npm install --no-bin-links --save-dev';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

	var getSalt = function (len) {
		len = len || 20;
		var set = '0123456789ABCDEFGHIJKLMNOPQURSTUVWXYZ -!$%?&*()=_+|£¢@{}[];:',
			setLen = set.length,
			salt = '';
		for (var i = 0; i < len; i++) {
			var p = Math.floor(Math.random() * setLen);
			salt += set[p];
		}
		return salt;
	}

	init.process({type: 'freestone'}, [
		// Prompt for these values.
		{
			name: 'name',
			message: 'Nom du client/projet',
			default : init.prompts.name.default,
		},
		{
			name: 'title',
			message: 'Titre du projet',
			default : init.prompts.name.default,
		},
		{
			name: 'homepage',
			message: 'Url',
		},
		{
			name: 'author_name',
			message: 'Auteur',
			default : 'La Grange',
		},
		{
			name: 'author_email',
			message: 'Email',
			default : 'info@la-grange.ca',
		},
		{
			name: 'db_name',
			message: 'Nom de la db mysql',
			default : init.prompts.name.default,
		},
		{
			name: 'version',
			message: 'Version',
			default: '0.0.1',
		},
		{
			name: 'is_requirejs',
			message: 'Utilise require.js?',
			default : 'y'
		}
	], function(err, props) {
		/*
		var renames = init.renames;
		renames['js/vendor/**'] = false;
		renames['css/**'] = false;
		/**/

		var files = init.filesToCopy(props);

		var jsToUse;
		var jsToIgnore;
		if(props.is_requirejs == 'y'){
			jsToIgnore = /js_norequire\//;
			jsToUse = /js_require\//;
		} else {
			jsToIgnore = /js_require\//;
			jsToUse = /js_norequire\//;
		}

		var destPath; 
		var origPath; 
		for (destPath in files){
			origPath = files[destPath];

			if(destPath.match(jsToIgnore)) {
				delete(files[destPath]);
			} else {
				var transformedPath = destPath;
				if(transformedPath.match(jsToUse)) {
					transformedPath = transformedPath.replace(jsToUse, 'js/');
				}

				//remplace le name du path
				transformedPath = transformedPath.replace(/\/name\//, '/'+props.name+'/');
				transformedPath = transformedPath.replace(/\/name\./, '/'+props.name+'.');

				delete(files[destPath]);
				files[transformedPath] = origPath;
			}
		}

		props.rjs_include = '';
		props.js_include = '';

		props.keywords = [];
		props.devDependencies = {
			'grunt-contrib-concat': '~0.3.0',
			'grunt-contrib-uglify': '~0.3.2',
			'grunt-contrib-jshint': '~0.9.0',
			'grunt-contrib-watch': '~0.5.3',
			'grunt-contrib-less' : '~0.9.0',
		};

		if(props.is_requirejs){
			props.devDependencies['grunt-contrib-requirejs'] = '~0.4.1';
			props.rjs_include = '<script data-main="{dir}/js/app.js" src="{dir}/js/require.js"></script>';
		} else {
			props.js_include = '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\r\n'+
								'<script>window.jQuery || document.write(\'<script src="{dir}/js/libs/jquery.min.js"><\/script>\')</script>\r\n'+
								'<script src="js/main.js"></script>';
		}
		
		// Actually copy (and process) files.
		init.copyAndProcess(files, props, {noProcess: ['js/vendor/**', 'js/grange/**']});
		
		// Generate package.json file, used by npm and grunt.
		init.writePackageJSON('package.json', props);

		// All done!
		done();
	});

};


/*

*/