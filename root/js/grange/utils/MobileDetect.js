

define([],
	function() {

		var MobileDetect = {
			Android: function() {
				return navigator.userAgent.match(/Android/i) ? true : false;
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) ? true : false;
			},
			any: function() {
				//return true;
				return (MobileDetect.Android() || MobileDetect.BlackBerry() || MobileDetect.iOS() || MobileDetect.Windows());
			}
		};
		
		return MobileDetect;
		
	}
);