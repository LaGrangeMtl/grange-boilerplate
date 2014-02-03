/** 
	@author Martin Vézina, 2012-06
	Loads content through AJAX and create it as an AsyncContentTransition. The definition of a transition must be included in a script with class "async", that sets

	

	This script will be injected in the dom and called immediately so as to extend the object with the defined transition.

*/

define([
		'jquery',
		'lagrange/app/Async'
	],
	function($, Async) {

		var cachedDeferred = {};
		
		var Factory = {
			createLoadedContent : function(rawResponse, createParams) {
				
				var title = this.getTitle(rawResponse);
				
				var asyncExtender = Async.getExtender(rawResponse);
				var noscriptResponse = asyncExtender.getFilteredResponse();
				
				var node = createParams.selector ? $(createParams.selector, noscriptResponse) : $('<div>').append(noscriptResponse);
				//si le node n'est pas trouvé avec le selector, il est possible que le node soit au premier niveau du jquery donné
				if(node.length == 0 && createParams.selector){
					node = noscriptResponse.filter(createParams.selector);
				}
				
				createParams.title = title;
				
				var content = this.createContent(node, createParams);
				content = asyncExtender.extend(content);
				
				return content;
			},
			
			getTitle : function(rawResponse) {
				
				var title = rawResponse.filter('title').html();
				
				return title;
			},
			
			//si la page est celle affichée au load (donc pas par ajax) il faut quand meme la créer parce qu'elle doit exister pour la navigation. i.e. elle doit avoir le meme comportement qu'une page qui serait loadée par ajax
			createOriginalContent : function(createParams) {
				var content = this.createContent($(createParams.selector), createParams);
				
				var asyncExtender = Async.getExtender();
				content = asyncExtender.extend(content);
				
				var deferred = $.Deferred();
				deferred.resolve(content);
				this.putDeferredToCache(createParams.id, deferred.promise());
				return content;
			},
		
			/** 
			ABSTRACT Crée l'objet de page. La fonction doit être overridée par les sous-classes pour crer d'autres types de contenus.
			*/
			createContent : function() {
				throw new Error('createContent is abstract');	
			},
			
			/**
			ABSTRACT
			*/
			load : function() {
				throw new Error('load is abstract');	
			},
			
			putDeferredToCache : function(id, deferred) {
				cachedDeferred[id] = deferred;
			},
			
			getFromCache : function(id) {
				if(cachedDeferred[id]) {
					//console.log(path+' from cache');
					return cachedDeferred[id];
				}
				return false;
			},
			
			getFromAjax : function(path, createParams) {

				var _self = this;

				var ajax = $.ajax({
					url : path,
					dataType :'html'
				});

				var success = function(data, textStatus, jqXHR) {
					return _self.createLoadedContent($(data), createParams);
				};

				var fail = function(jqXHR, textStatus, errorThrown) {
					_self.putDeferredToCache(createParams.id, null);
					console.log(textStatus, jqXHR.responseText);
				};

				var filtered = ajax.pipe(success, fail);
				
				_self.putDeferredToCache(createParams.id, filtered.promise());
				return filtered.promise();
			},
			
			getLoadingDeferred : function(path, createParams){
				
				createParams = createParams || {};
				createParams = $.extend({id:Async.getPagePart(path)}, createParams);
				
				return this.getFromCache(createParams.id) || this.getFromAjax(path, createParams);

			}

			
		}

		return Factory;

	}
);