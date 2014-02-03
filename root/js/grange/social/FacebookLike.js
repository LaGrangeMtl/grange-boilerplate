

define([],
	function() {
		
		var elementToParse = null;
		
		var parseAttempt = function() {
			var FB = window.FB || null;
			if(FB){
				FB.XFBML.parse(elementToParse);
				return;
			}
			setTimeout(parseAttempt, 100);
		}
//
		var FacebookLike = {
			
			putIFrame : function(url, selector, attr) {
				
				var defaultAttr = {
					show_faces : 'false',	
					send : 'false',	
					width : '450',	
					action : 'like'	
				};
				
				var totalAttr = $.extend(defaultAttr, attr);
				
				var fbml = '<fb:like href="' + url + '"';
				$.each(totalAttr, function(k, v){
					fbml += ' ' + k + '="' + v + '"';
				});
				
				fbml += '></fb:like>';
				
				var container = $(selector);
				container.empty().html(fbml);
				
				elementToParse = container.get(0);
				parseAttempt();
			}
			
		};
		
		return FacebookLike;
		
	}
);