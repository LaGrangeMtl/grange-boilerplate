
(function(ns){
	require.config({
		baseUrl: '/c/testgrnt/js/',
		paths:{
			'jquery' : 'vendor/jquery.min',
			'vendor/jquery.scrollto' : 'vendor/jquery.scrollTo-1.4.2-min',
			'vendor/jquery.easing' : 'vendor/jquery.easing.1.3'
		},
		shim: {
			
			'jquery': {
				deps: []
			},
			'vendor/jquery.easing': {
				deps: ['jquery']
			},
			'vendor/jquery.scrollto': {
				deps: ['jquery']
			},
			'vendor/jquery.imagesloaded': {
				deps: ['jquery']
			}
		}
	});
		
	require(['jquery', 'testgrnt/Main'], function($, testgrnt){
		$(function(){
			ns.app = testgrnt.initialize();
		});
	});
	
})(window.testgrnt = window.testgrnt || {});