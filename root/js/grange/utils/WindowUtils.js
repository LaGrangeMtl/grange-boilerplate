

define([
		'jquery',
		'vendor/jquery.scrollto',
		'vendor/jquery.easing'
	],
	function() {

		var Utils = {
			page : null,
			body : null,
			htmlWindow : null,
			htmlDocument : null
		};

		Utils.scrollTopPage = function() {
			this.page.animate({ scrollTop: 0 }, 600, "easeOutExpo");
		};

		Utils.scrollBottomPage = function() {
			var windowHeight = this.htmlWindow.height();
			var documentHeight = this.htmlDocument.height();
			this.page.animate({ scrollTop: documentHeight - windowHeight }, 600, "easeOutExpo");
			return false;
		};

		Utils.hasHitBottom = function() {
			if(this.htmlDocument.height() == window.pageYOffset + window.innerHeight){
				return true;
			}
		};

		//retourne la pos du scroll
		Utils.getScroll = function() {
			return this.htmlDocument.scrollTop();
		};

		//retourne la pos du scroll
		Utils.getWinWidth = function() {
			return this.htmlWindow.width();
		};
		//retourne la pos du scroll
		Utils.getWinHeight = function() {
			return this.htmlWindow.height();
		};

		//indique si un element est visible dans la page dépendant du scroll.
		Utils.isElementVisible = function(el) {
			var elTop = el.position().top;
			var elBot = elTop + el.height();
			var minVisible = this.getScroll();
			var maxVisible = minVisible + this.htmlWindow.height();
			//console.log(elTop, '<', maxVisible, elBot, '>', minVisible);
			if(elTop < maxVisible && elBot > minVisible) {
				return true;
			}
			return false;
		};

				
		/* =============================================================================
		MAIN OBJECT
		========================================================================== */
		Utils.initialize = function(){
			this.page = $("html, body");
			this.body = $("body");
			this.htmlWindow = $(window);
			this.htmlDocument = $(document);			
		};
		
		return Utils;
	}
);