
define([
		'jquery',
		'vendor/greensock/TweenLite',
		'vendor/greensock/TimelineLite'
	],
	function($) {
		
		var out = function(){
			$(this).data('tl').reverse();
		};
		
		var hover = function(){
			$(this).data('tl').play();
		}
		
		var AbstractButton = function(selector, setAnimation) {
			this.selector = selector;
			this.setAnimation = setAnimation;
			this.els = null;
		}

		AbstractButton.prototype = {
			
			setSelector : function(selector) {
				this.selector = selector;
			},
			
			//abstract
			setAnimation : function(el, tl) {
				throw new Exception('setAnimation is abstract ('+this.selector+')');
			},
			
			
			setTimeline : function(elements) {
				var _self = this;
				elements.each(function(i, element){
					element = $(element);
					if(element.data('tl')) return;
					var tl = new TimelineLite({onComplete: function(){
						element.data('tl').stop();
					}});
					tl.stop();
					element.data('tl', tl);
					_self.setAnimation(element, tl);
				});
				
			},

			getTimeline : function(element) {
				return element.data('tl');
			},
			
			activate : function(context) {
				if(!this.selector) return;

				var els = $(this.selector, context);
				this.setTimeline(els);
				els.on('mouseenter.buttonGrange', hover).on('mouseleave.buttonGrange', out).on('click.buttonGrange', out);

			},
			
			deactivate : function(context){
				if(!this.selector) return;
				var els = $(this.selector, context);
				els.off('.buttonGrange');
			}
		};

		return AbstractButton;
	}
);
