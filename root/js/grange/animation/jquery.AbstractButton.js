/**
	A simple class to animate button rollovers with GreenSock GSAP.
	Modified from its original version so as not to be loaded by require.js.

	Author: Martin Vézina 2012 http://la-grange.ca

	requires :
		jQuery (http://jquery.com)
		GSAP (http://www.greensock.com)
		
	Licensed under the MIT license

*/
;(function ( $, window, document, undefined ) {

	var pluginName = 'abstractButton';
	var pluginNameSpace = 'Button';
	var defaults = {
		autoActivate : true
	};
		
			
	var out = function(){
		$(this).data('tl').reverse();
	};
	
	var hover = function(){
		$(this).data('tl').play();
	};
	
	var PluginPrototype = {
		init : function(el, options) {
			this.el = el;
			this.$el = $(el);
			this.options = $.extend({}, defaults, options);
			this.activate();
			if(this.options.autoActivate === false) {
				this.deactivate();
			}
			
		},
				
		setTimeline : function() {
			var element = this.$el;
			if(element.data('tl')) return;
			var tl = new TimelineLite({onComplete: function(){
				element.data('tl').stop();
			}});
			tl.stop();
			element.data('tl', tl);
			this.setAnimation(element, tl);
			
		},

		getTimeline : function(element) {
			return element.data('tl');
		},
		
		activate : function(context) {
			this.setTimeline();
			this.$el.on('mouseenter.buttonGrange', hover).on('mouseleave.buttonGrange, click.buttonGrange', out);
		},
		
		deactivate : function(context){
			this.$el.off('.buttonGrange');
		}
	};
	
	$[pluginName] = function ( concreteName, setAnimation ) {
		
		var fullName = pluginNameSpace + '_' + concreteName;
		
		//create the concrete object (empty for now) which will become the prototype of all plugins for this type. This object's prototype is the Plugin prototype.
		var ConcretePlugin = Object.create(PluginPrototype);
		//now add concrete definition to our prototype
		ConcretePlugin.setAnimation = setAnimation;
		ConcretePlugin.name = fullName;

		$.fn[fullName] = function(options) {
			var input = arguments;
			if ( this.length ) {
				return this.each(function () {
					//plugin is not instanciated. Create it (requires an object or null as arguments)
					if (!$.data(this, fullName)) {
						if(typeof options === 'object' || !options){
							//create an instance of our concrete plugin
							var instance = Object.create(ConcretePlugin);
							instance.init(this, options);
							$.data(this, fullName, instance);
						} else {
							$.error( 'Plugin jQuery.' + fullName + " has not yet been instanciated." );
						}
					} else if(typeof options === 'string') {
						//methods that begin with _ are private
						if(options[0]==='_') {
							$.error( 'Plugin jQuery.' + fullName + ' : method ' + options + ' is private');
							return;
						}
						
						//plugin is instanciated, get it
						var controller = $.data(this, fullName);
						if(controller[options]) {
							controller[options](Array.prototype.slice.call(input, 1));
						} else {
							$.error( 'Plugin jQuery.' + fullName + " has no method " + options);
						}
					} else {
						$.error( 'Plugin jQuery.' + fullName + " has already been instanciated.");
					}
					
				});
			}
		}

	}


})( jQuery, window, document );