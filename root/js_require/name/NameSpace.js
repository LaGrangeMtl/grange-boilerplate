

(function(ns, undefined) {
	define([], 
	function() {

		/*
		Initialise les fonctions de base du namespace (fonctions globales)
		
		*/
		
		ns.app = null;
		ns.name = '{%= name %}';

		ns.initialize = function(){
			
			
		};
		
		return ns;
	});

})(window.{%= name %} = window.{%= name %} || {});