
define([
		'jquery'
	],
	function($) {
		
		var youtubeLoaded = $.Deferred();
		window.onYouTubePlayerAPIReady = function() {
			youtubeLoaded.resolve();
		};/**/
		require(['http://www.youtube.com/iframe_api'], function(){});

		return youtubeLoaded.promise();

});