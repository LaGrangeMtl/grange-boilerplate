

define([
		'jquery',
		'lagrange/utils/YoutubeLoader'
	],
	function($, YoutubeLoader) {
		
		
		
		var YouTube = function(settings) {
			var defaultSettings = {
				height:800,
				width:1200,
				onAdded: function(){},
				onEnded: function(){}
			};
			
			settings = settings || defaultSettings;
			settings = $.extend(defaultSettings, settings);
			
			var _self = this;
			
			var onPlayerReady = function(event) {
				settings.onAdded();
				event.target.playVideo();
			};
			
			var onPlayerStateChange = function(event) {
				//console.log(event.data);
				if (event.data == YT.PlayerState.ENDED) {
					_self.kill();
				}
			};
			
			
			YoutubeLoader.done(function(){
				_self.player = new YT.Player(settings.elementId, {
					height: settings.height,
					width: settings.width,
					videoId: settings.youtubeId,
					playerVars: {
						'showinfo' : 0,
						'rel' : 0,
						'theme' : 'light',
						'color' : 'white',
						'hd': 1,
						'vq' : settings.quality || 'default'
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
				});
				//_self.player.setPlaybackQuality(settings.quality || 'default');
			});
			
			_self.kill = function() {
				
				if(!_self.player) return;
				
				var domEl = $('iframe#'+settings.elementId);
				_self.player.stopVideo();
				_self.player = null;
				
				domEl.hide();
				domEl.remove();
				settings.onEnded(domEl);
				
			}
			
			
		};
		
		return YouTube;

	}
);