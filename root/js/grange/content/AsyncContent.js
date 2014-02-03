/** 
	
	@author Martin Vézina, 2012-06

	Base class for content that is intended to be loaded by an Ajax call. Will load its images and resolve a $.Deffered when ready.

*/
define([
		'jquery',
		'vendor/jquery.imagesloaded'
	],
	function($) {

		var AsyncContent = {
			/** 
			Initializes the content. At this point, by requirement, the node has already been set. The node is set before the content is added to the dom, and this init is called only when injected in the dom.
			*/

			setNode : function(data) {
				
				this.node = $(data);//$('<div>').append(data);
			},

			getNode : function(node) {
				return this.node;
			},
			
			onAddedToDOM : function() {
				
				if(this.asyncContentPromise) {
					return this.asyncContentPromise;
				}
				
				var _self = this;
				//console.log(this);
				var imagesDeferred = this.node.imagesLoaded();
				
				//Some images can be included in the content because they are used as css backgrounds and we still want to wait for them to be loaded before resolving. We need to remove these images when they are loaded, as their purpose is only to know when they are ready.
				imagesDeferred.always(function(){
					_self.node.find('img.bgLoader').remove();
				});
				
				var wholeDeferred = $.Deferred();
				var afterDeferred = this.afterAdded();
				
				var resolveWhole = function() {
					wholeDeferred.resolve();
				};
				
				//we want to resolve even if some images are broken
				imagesDeferred.fail(function(){
					afterDeferred.then(resolveWhole);
				});
				
				$.when(imagesDeferred, afterDeferred).then(resolveWhole);
				
				this.asyncContentPromise = wholeDeferred.promise();
				return this.asyncContentPromise;
			},
			
			//this function can be overridden by the concrete class, if some actions are to be performed and for which we might have to wait before the content is ready
			afterAdded : function() {
				return $.Deferred().resolve();
			},
			
			activate : function() {
				
			},
			
			deactivate : function() {
				
			}
			
		};

		return AsyncContent;

	}
);