/*
 * grunt-init-freestone
 * https://gruntjs.com/
 *
 */

'use strict';

//var _ = require('underscore')._;

// Basic template description.
exports.description = 'Create a La Grange project, with less and jquery.';

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
		},
		{
			name: 'is_freestone',
			message: 'Utilise Freestone?',
			default : 'y'
		}
	], function(err, props) {
		/*
		var renames = init.renames;
		renames['js/vendor/**'] = false;
		renames['css/**'] = false;
		/**/

		var files = init.filesToCopy(props);

		// RequireJS
		var jsToUse;
		var jsToIgnore;
		if(props.is_requirejs == 'y'){
			jsToIgnore = /js_norequire\//;
			jsToUse = /js_require\//;
		} else {
			jsToIgnore = /js_require\//;
			jsToUse = /js_norequire\//;
		}

		// Freestone
		var configToIgnore;
		var configToUse;
		if(props.is_freestone == 'y'){
			configToUse = /freestone\//;
		} else {
			configToIgnore = /freestone\//;
		}

		var libFolder = 'app';

		for (var file in files) {
			// Repath freestone files
			if(props.is_freestone == 'y'){
				if (file.indexOf('freestone/') > -1) {
			        var path = files[file],
			            newFile = file.replace('freestone/', '/');
			        files[newFile] = path;
			        delete files[file];
			    } else if(file.match('index.html')){
			    	delete files[file];
			    }
			} else {
				if (file.indexOf('freestone/') > -1) {
					delete files[file];
				}
			}

			// Repath RequireJS files
			if(props.is_requirejs == 'y'){
				if (file.indexOf('js_require/') > -1) {
			        var path = files[file],
			            newFile = file.replace('js_require/', 'js/');
			        files[newFile] = path;
			        delete files[file];
			    }
			} else {
				if (file.indexOf('js_norequire/') > -1) {
			        var path = files[file],
			            newFile = file.replace('js_norequire/', 'js/');
			        files[newFile] = path;
			        delete files[file];
			    }
			}
		}

		var destPath; 
		var origPath;
		for (destPath in files){
			origPath = files[destPath];

			// RequireJS
			if(destPath.match(jsToIgnore)) {
				delete(files[destPath]);
			} else {
				var transformedPath = destPath;
				if(transformedPath.match(jsToUse)) {
					transformedPath = transformedPath.replace(jsToUse, 'js/');
				}

				delete(files[destPath]);
				//remplace le name du path
				transformedPath = transformedPath.replace(/\/name\//, '/'+props.name+'/');
				transformedPath = transformedPath.replace(/\/name\./, '/'+props.name+'.');

				files[transformedPath] = origPath;
			}
		}

		props.salt = getSalt(32);

		props.rjs_include = '';
		props.js_include = '';

		props.keywords = [];
		props.devDependencies = {
			'grunt-contrib-concat': '~0.3.0',
			'grunt-contrib-uglify': '~0.3.2',
			'grunt-contrib-jshint': '~0.8.0',
			'grunt-contrib-watch': '~0.5.3',
			'grunt-contrib-less' : '~0.9.0',
			'grunt-notify' : '~0.2.17',
		};

		if(props.is_requirejs == 'y' && props.is_freestone == 'y'){
			props.devDependencies['grunt-contrib-requirejs'] = '~0.4.1';
			props.rjs_include = '<script data-main="{dir}/js/app.js" src="{dir}/js/require.js"></script>';
		} 
		else if(props.is_requirejs == 'y') {
			props.devDependencies['grunt-contrib-requirejs'] = '~0.4.1';
			props.rjs_include = '<script data-main="js/app.js" src="js/require.js"></script>';
		}
		else if(props.is_freestone == 'y') {
			props.js_include = '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\r\n'+
								'<script>window.jQuery || document.write(\'<script src="{dir}/js/libs/jquery.min.js"><\/script>\')</script>\r\n'+
								'<script src="{dir}/js/main.js"></script>';
		}
		else {
			props.js_include = '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\r\n'+
								'<script>window.jQuery || document.write(\'<script src="js/libs/jquery.min.js"><\/script>\')</script>\r\n'+
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