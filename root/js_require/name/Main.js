define(
	[
		'{%= name %}/NameSpace',
		'lagrange/app/App',
		'jquery'
	], 
	function(ns, App, $) {

						
		/* =============================================================================
		MAIN OBJECT
		========================================================================== */
		
		var ClientApp = Object.create(App);
		
		$.extend(ClientApp, {
			
			initializeApp : App.initialize,
			
			initialize : function(){
				this.initializeApp();
				ns.initialize();
				return this;
			},

			
			activate : function(context) {
				
			},

			deactivate : function(context) {
				
			}
		});
		
		return ClientApp;
		
	}
);