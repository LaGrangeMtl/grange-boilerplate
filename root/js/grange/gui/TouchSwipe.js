
define([
		'jquery',
		'lagrange/utils/GConsole'
	],
	function($, GConsole) {
		
		var HORIZ = 'horizontal';
		var VERT = 'vertical';
		
		var dragThresold = 3;
	
		function TouchSwipe(element, settings) {
			this.element = element;
			
			this.settings = $.extend({
				pageTreshold : 100,
				orientation: HORIZ,
				onStart: false,
				onMove: false,
				onEnd: false,
				onPageChange: false
			}, settings);
		};
		
		var isTouch = function() {
			return ( 'ontouchstart' in window );
		}
		
		var parseTouchesEvent = function( e, touchIndex ) {
			if ( touchIndex == null ) {
				touchIndex = 0;
			}
			if ( isTouch() ) {
				return { x: e.originalEvent.touches[ touchIndex ].pageX, y: e.originalEvent.touches[ touchIndex ].pageY };
			}
			return { x: e.originalEvent.pageX, y: e.originalEvent.pageY };
		}
		
	
		TouchSwipe.prototype = {
			
			onPageChange : function(dir) {
				if(this.settings.onPageChange) {
					this.settings.onPageChange(dir);
				}
			},
			
			onMove : function(move) {
				if(this.settings.onMove) {
					this.settings.onMove(move);
				}
			},
			
			onEnd : function() {
				if(this.settings.onEnd) {
					this.settings.onEnd();
				}
			},
			
			onStart : function() {
				if(this.settings.onStart) {
					this.settings.onStart();
				}
			},
			
			
			activate : function() {
				
				var _self = this;
				var firstTouch = 0;
				
				var orient = this.settings.orientation;
				
				var holding = false;
				var dragging = false;
				var dragHorizontal = false;
				var dragVertical = false;
				var dx;
				var dy;
				
				var ts = isTouch() ? 'touchstart' : 'mousedown';
				var tm = isTouch() ? 'touchmove' : 'mousemove';
				var te = isTouch() ? 'touchend' : 'mouseup';
				
				this.element.on(ts+".grangeSwipe", function(e) {
					
					holding = true;
					dragHorizontal = false;
					dragVertical = false;
					
					firstTouch = parseTouchesEvent( e );
					//GConsole.log(firstTouch);
					if ( !isTouch() ) {
						e.preventDefault();
					}
					_self.onStart();
					
				});
				
				this.element.on(tm+".grangeSwipe", function(e) {
					
					if ( !holding ) {
						return;		
					}
					var p = parseTouchesEvent( e );
					if ( !dragging ) {
						var ox = Math.abs( p.x - firstTouch.x );
						var oy = Math.abs( p.y - firstTouch.y );
						dragHorizontal = ox > oy && ( p.x <= firstTouch.x - dragThresold || p.x >= firstTouch.x + dragThresold );
						dragVertical = oy > ox && ( p.y <= firstTouch.y - dragThresold || p.y >= firstTouch.y + dragThresold );
						if ( dragHorizontal || dragVertical ) {
							dragging = true;	
						}
					}
					
					if ( dragVertical && orient == HORIZ ) {
						return;
					}
					if ( dragHorizontal && orient != HORIZ ) {
						return;
					}
					if ( dragHorizontal && orient == HORIZ ) {
						e.preventDefault();
					}
					if ( dragVertical && orient != HORIZ ) {
						e.preventDefault();
					}
					dx = firstTouch.x - p.x;
					dy = firstTouch.y - p.y;
					_self.onMove( orient == HORIZ ? dx : dy );
					
				})

				this.element.on(te+".grangeSwipe", function(e) {
					
					if ( dragging ) {
						try{
							
							var axis = orient == HORIZ ? dx : dy;
							e.preventDefault();
							
							if(Math.abs(axis) > _self.settings.pageTreshold) {
								_self.onPageChange(axis > 0 ? -1 : 1 );
							}
						} catch(err) {
							//GConsole.log(err.message);
						}
					}
					_self.onEnd();
					holding = false;
					dragging = false;		
					firstTouch = null;
					
				});
			},
			
			deactivate : function() {
				this.onEnd();
				this.element.off(".grangeSwipe");
			}
			
		};
			
	
		return TouchSwipe;
	}
);