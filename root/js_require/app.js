
(function(ns){
	require.config({
		baseUrl: '',
		paths:{
			
		},
		shim: {
			'jquery': {
				deps: []
			}
		}
	});
		
	require(['jquery'], function($){
		$(function(){
			
		});
	});
	
})(window.{%= name %} = window.{%= name %} || {});