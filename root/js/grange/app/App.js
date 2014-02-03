
/** 

*/
define([
		'lagrange/utils/WindowUtils'
	],
	function(WU) {

		if (typeof Object.create !== 'function') {
			Object.create = function (o) {
				function F() {}
				F.prototype = o;
				return new F();
			};
		}		
		/* =============================================================================
		MAIN OBJECT
		========================================================================== */
		return {
			initialize : function(){

				WU.initialize();
				
				return this;
			}
		};
	}
);