/**

	classe de base de chacune des transitions. Les fonctions peuvent être overridées.
	
	Les activations (activate et deactivate) se font au début de chaque transition (avant animate in, avant animate out).

 */

define([
		'jquery',
		'lagrange/content/AsyncContent',
		'vendor/greensock/TweenLite',
		'vendor/greensock/TimelineMax'
	],
	function($, AsyncContent) {
		
		var IN_FINISH_LABEL = 'animateInFinish';
		var OUT_START_LABEL = 'animateOutStart';

		var AsyncContentTransition = Object.create(AsyncContent);
		
		$.extend(AsyncContentTransition, {
			
			IN : 1,
			OUT : -1,

			init : function() {
				this.tl = null;
			
				/** Time at which the in finishes */
				this.animateInFinishTime = null;
				this.animateOutStartTime = null;
				/** current direction (1/-1) */
				this.direction = null;
				this.isInFinished = false;
				
				this.outDeferred = null;
				this.inDeferred = null;
				
				this.asyncContentTransitionPromise = null;
			},
			
			contentAddedToDOM : AsyncContentTransition.onAddedToDOM, 
			
			onAddedToDOM : function () {
				if(this.asyncContentTransitionPromise) {
					return this.asyncContentTransitionPromise;
				}
				
				var _self = this;
				//super
				var parentInit = this.contentAddedToDOM();
				var deferred = $.Deferred();
				
				parentInit.always(function(){
					_self.initAnim();
					deferred.resolve();
				});
				
				this.asyncContentTransitionPromise = deferred.promise();
				return this.asyncContentTransitionPromise;
			},
			
			initAnim : function() {
				//console.log('init anim '+this.name)
				if(!this.tl){
					this.setTimeline();
				}
				
			},
			
			/**
			Crée l'objet timeline de l'animation
			*/
			setTimeline : function(){
				var _self = this;
				this.tl = new TimelineMax({onComplete : function(){
					_self.afterAnimateOut();
				}});
				this.tl.stop();

				this.setTransition();

				this.tl.addLabel(IN_FINISH_LABEL, this.animateInFinishTime);
				this.tl.addLabel(OUT_START_LABEL, this.animateOutStartTime);

				//console.log(this.tl, this.animateInFinishTime, this.animateOutStartTime);

				this.tl.addCallback(function(){
					_self.afterAnimateIn();
				}, this.animateInFinishTime);

			},

			/**
			Si l'anim existe, jump d'un coup à son in status, pour ne pas animater in au load original de la page
			*/
			jumpToInState : function() {
				if(this.animateInFinishTime && this.tl) {
					this.tl.gotoAndStop(this.animateInFinishTime);
				}
				this.activate();
				this.onStableState();
			},

			/** 
			Overridée
			*/
			setTransition : function() {
				this.tl.append( TweenLite.from(this.node, 1, {css:{opacity:0}, ease:Expo.easeOut}) );
				this.setAnimInFinishTime();
				this.tl.append( TweenLite.to(this.node, 1, {css:{opacity:0}, ease:Expo.easeOut}) );
			},

			setAnimInFinishTime : function(){
				this.animateInFinishTime = this.tl.totalDuration();
				this.tl.append( TweenLite.to(this.node, 2, {}) );
				this.animateOutStartTime = this.animateInFinishTime + 2;
			},

			/* =============================================================================
			IN
			========================================================================== */
			beforeAnimateIn : function(){
				this.activate();
			},
			
			animateIn : function(){
				//console.log('in', this.name);
				this.beforeAnimateIn();
				this.direction = this.IN;
				this.tl.restart();
				this.inDeferred = $.Deferred();
				return this.inDeferred.promise();
			},

			afterAnimateIn : function(){
				
				this.onStableState();
				
				if(this.direction == this.IN){
					this.tl.stop();
					
					if(this.inDeferred) {
						this.inDeferred.resolve();
					}
				};
				
				this.isInFinished = true;
			},
			
			onStableState : function(){
			
			},
			
			/* =============================================================================
			OUT
			========================================================================== */

			beforeAnimateOut : function(){
				this.deactivate();
			},

			animateOut : function(){
				//console.log('out', this.name);
				this.beforeAnimateOut();
				this.direction = this.OUT;
				this.tl.play(this.animateOutStartTime);
				this.isInFinished = false;
				
				this.outDeferred = $.Deferred();
				return this.outDeferred.promise();
				
			},

			afterAnimateOut : function(){
				//console.log('out complete', this.name);
				if(this.outDeferred) {
					this.outDeferred.resolve();
				}
				
			}
		});

		return AsyncContentTransition;
	}
);