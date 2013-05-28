/*
 *	jQuery: Navi.js Content Switcher - v1.9 - 5/28/2013
 *  http://navi.grantcr.com
 *	https://github.com/tgrant54/Navi.js
 *  Copyright (c) 2013 Tyler Grant
 *	Dual licensed under the MIT & Creative Commons Attribution-ShareAlike 3.0 Unported License.
 */
 ;(function($) {
    $.fn.navi = function(o){
		this.each(function() {
			var t=$(this),
				d=t.data("navi"),
				_= {
					hash: "#!/",
					content: $("#content"), 
                    routes: [], // object - hash,menu,content
                    activeClass: "active",
					defaultPage: true,
					useAnimation: true,
                    useBreadCrumbs: true,
					animationSpeed: 100,
					animationType: "slideUp",
					usePageTitle: true,
					defaultPageTitle: "Navi.js",
					useAjax: true,
					ajaxExtension: ".html",
					ajaxFolder: "./",
					
					init: function() {
                        if (_.routes.length >= 1) { // if any routes are set
                            $(_.routes).each(function(i) { // loop through
                                _.routes[i].cont = $(">ul>li", _.routes[i].content) // assign each object in the array a 'cont' 
                                _.routes[i].menu = $(">ul>li", _.routes[i].menu) // assign each object in the array a 'menu'
                                _.routes[i].content.attr("route",_.routes[i].hash) // set the route attr on the content
                            })
                            window.numRoutes = _.routes.length
                        }
                        else { // else no routes are set, 
                            _.menu = $(">ul>li",_.me) // menu is each my > ul > li
						    _.cont = $(">ul>li", _.content) // cont
                            _.hashLen = _.hash.length // hash length
    				    	_.defaultPage ? location.hash === "" ? _.loadDefault() : false : false // load a default page?
					    	_.setActive() // go ahead and set active
                        }
					},
					loadDefault: function() {
						_.menu.each(function(i,e) {
							if ($(e).hasClass(_.activeClass)) {
								location.hash = $(">a",e).attr("href");
							}
						})
					},
					setActive: function(speed) {
                        _.cont ? // If cont was set by init (empty routes)
						_.cont.each(function(i,e) { // since it was set loop through it 
							if ($(e).attr("id") == location.hash.slice(_.hashLen) && location.hash.slice(0,_.hashLen) == _.hash) { // check if the id == the spliced hash (#!/home => home) and a second check
								var ajaxLoad; // load a var - string for what gets loaded
								_.useAjax ? ajaxLoad = String(_.ajaxFolder+$(e).attr('id')+_.ajaxExtension) : false // use ajax ? Then set the ajaxLoad to string of the folder/id/ajaxExtension or false
								
								ajaxLoad ? _.useAnimation?$(e).fadeIn(speed).load(ajaxLoad, function() { //ajax load ? use animation, give a fade, and load ajaxLoad
									$(e).addClass(_.activeClass).siblings().html("").css("display","none").removeClass(_.activeClass) //set classes
									if (typeof _gaq !== "undefined" && _gaq !== null) { // ga stuff
										_gaq.push(['_trackPageview',  location.hash])
									}
								}):$(e).fadeIn(0).load(ajaxLoad, function() { // else if ajax is not set, do this
									$(e).addClass(_.activeClass).siblings().html("").css("display","none").removeClass(_.activeClass)
									if (typeof _gaq !== "undefined" && _gaq !== null) {
										_gaq.push(['_trackPageview',  location.hash])
									}
								}) : _.useAnimation?$(e).fadeIn(speed).addClass(_.activeClass).siblings().css("display","none").removeClass(_.activeClass).removeAttr("class"):$(e).fadeIn(0).addClass(_.activeClass).siblings().css("display","none").removeClass(_.activeClass)
								
								
							}
						}) :$(_.routes).each(function(i) { // If cont was not set by inti, loop through each route
						     _.routes[i].cont.each(function(n, e) { // loop through each 'route.cont' and do same stuff as above (yes, i know)
						         if ($(e).attr("id") == location.hash.slice(_.routes[i].hash.length) && location.hash.slice(0, _.routes[i].hash.length) == _.routes[i].hash) {
						             var ajaxLoad;
						             _.useAjax ? ajaxLoad = String(_.ajaxFolder + $(e).attr('id') + _.ajaxExtension) : false
						
						             ajaxLoad ? _.useAnimation ? $(e).fadeIn(speed).load(ajaxLoad, function() {
						                 $(e).addClass(_.activeClass).siblings().html("").css("display", "none").removeClass(_.activeClass)
						                 if (typeof _gaq !== "undefined" && _gaq !== null) {
						                     _gaq.push(['_trackPageview', location.hash])
						                 }
						             }) : $(e).fadeIn(0).load(ajaxLoad, function() {
						                 $(e).addClass(_.activeClass).siblings().html("").css("display", "none").removeClass(_.activeClass)
						                 if (typeof _gaq !== "undefined" && _gaq !== null) {
						                     _gaq.push(['_trackPageview', location.hash])
						                 }
						             }) : _.useAnimation ? $(e).fadeIn(speed).addClass(_.activeClass).siblings().css("display", "none").removeClass(_.activeClass).removeAttr("class") : $(e).fadeIn(0).addClass(_.activeClass).siblings().css("display", "none").removeClass(_.activeClass)
						         }
						     })
						 })
						
                        if (_.routes.length >= 1) { // if routes are set
						     $(">ul>li", _.content).each(function(i, e) { // since cont is not set, we still need to be kind to set the stuff again
						         if ($(e).attr("id") == location.hash.slice(_.hash.length) && location.hash.slice(0, _.hash.length) == _.hash) {
						             var ajaxLoad;
						             _.useAjax ? ajaxLoad = String(_.ajaxFolder + $(e).attr('id') + _.ajaxExtension) : false
						
						             ajaxLoad ? _.useAnimation ? $(e).fadeIn(speed).load(ajaxLoad, function() {
						                 $(e).addClass(_.activeClass).siblings().html("").css("display", "none").removeClass(_.activeClass)
						                 if (typeof _gaq !== "undefined" && _gaq !== null) {
						                     _gaq.push(['_trackPageview', location.hash])
						                 }
						             }) : $(e).fadeIn(0).load(ajaxLoad, function() {
						                 $(e).addClass(_.activeClass).siblings().html("").css("display", "none").removeClass(_.activeClass)
						                 if (typeof _gaq !== "undefined" && _gaq !== null) {
						                     _gaq.push(['_trackPageview', location.hash])
						                 }
						             }) : _.useAnimation ? $(e).fadeIn(speed).addClass(_.activeClass).siblings().css("display", "none").removeClass(_.activeClass).removeAttr("class") : $(e).fadeIn(0).addClass(_.activeClass).siblings().css("display", "none").removeClass(_.activeClass)
						         }
						     })
                        }
                        
                        _.useBreadCrumbs ? _.setBreadCrumbs() : _.menu.each(function(i2,e2) {
                            if ($(">a",e2).attr("href") == location.hash){
                                $(e2).addClass(_.activeClass).siblings().removeClass(_.activeClass)
                            }
                        })
                         _.setPageTitle()
					},
                    setPageTitle: function() {
                        if (_.usePageTitle) {
                            _.menu.each(function(i,e) {
                                if ($(e).hasClass(_.activeClass)) {
                                    $("title").text(_.defaultPageTitle+$(e).attr("data-title"))
                                }
                            })
                        }
                    },
                    setBreadCrumbs: function() {
                        $("[href]").each(function(n,e2) {
    						if ($(e2).attr('href') == location.hash) {
								$(e2).parent().addClass('active').siblings().removeClass('active').removeAttr("class")
							}
						})  
                    },
                    routeHelper: function(idx){
                        _.routes[idx].hash == location.hash.slice(0,_.routes[i].hash.length) ? true : false
                    },
					animation: function(type,speed,lHash) {
                        typeof speed == "number" ? speed = speed : speed = Number(speed);
						switch (type) {
                            case 'slideUp':
                                if (_.routes.length >= 1) {
                                    $(_.routes).each(function(i) {
                                        if (_.routes[i].hash == location.hash.slice(0,_.routes[i].hash.length)) {
                                            _.routes[i].content.slideUp(speed, function() {
                                                _.setActive()
                                                _.routes[i].content.slideDown(speed, function() { 
                                                    _.routes[i].content.css("height", "")    
                                                })
                                            })
                                        }
                                    })
                                }
                                else {
                                    if (location.hash.slice(0,_.hashLen)){
                                        _.content.slideUp(speed, function() {
                                            _.setActive()
                                            _.content.slideDown(speed, function() {
                                                _.content.css("height", "");
                                            })
                                        })
                                    }
                                    
                                }
                                break;
                            case 'slideUpLeft':
                                _.content.stop().animate({
                                    width: "0",
                                    height: "0",
                                },speed, function() {
                                    _.setActive()
                                    _.content.stop().animate({
                                        width: "100%",
                                        height: "100%"
                                    },speed)
                                })
                                break;
							case 'slideLeft':
								_.content.stop().animate({
									width: "0"
								},speed,function() {
									_.setActive(speed)
									_.content.stop().animate({
										width: "100%"
									},speed)
								})
								break;
							case 'fade':
								_.content.fadeOut(speed, _.setActive).fadeIn(speed)
								break;
							case 'rotateOutDownLeft':
									
									_.content.css({
										"-webkit-animation-duration": Number(speed)+"ms",
										"-moz-animation-duration": Number(speed)+"ms",
										"-o-animation-duration": Number(speed)+"ms",
										"animation-duration": Number(speed)+"ms"
									})
									_.content.addClass("animated rotateOutDownLeft")
									_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
										_.setActive()
										_.content.removeClass("animated rotateOutDownLeft").addClass("animated rotateInUpLeft")
									})

								break;
							case 'bounceOutDown':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated bounceOutDown")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated bounceOutDown").addClass("animated bounceInUp")
								})
								break;
							case 'bounceOut':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated bounceOut")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated bounceOut").addClass("animated bounceIn")
								})
								break;
							case 'lightSpeed':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated lightSpeedOut")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated lightSpeedOut").addClass("animated lightSpeedIn")
								})
								break;
							case 'roll':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated rollOut")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated rollOut").addClass("animated rollIn")
								})
								break;
							case 'flipX':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated flipOutX").removeClass("flipInX")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated flipOutX").addClass("animated flipInX")
								})
                                break;
							case 'flipY':
								_.content.css({
									"-webkit-animation-duration": Number(speed)+"ms",
									"-moz-animation-duration": Number(speed)+"ms",
									"-o-animation-duration": Number(speed)+"ms",
									"animation-duration": Number(speed)+"ms"
								})
								_.content.addClass("animated flipOutY").removeClass("flipInY")
								_.content.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
									_.setActive()
									_.content.removeClass("animated flipOutY").addClass("animated flipInY")
								})
                                break;

						}
					}
				}
			d?_=d:t.data({navi: _})
			if (typeof o == 'object'){
				$.extend(_,o);
			}
			_.me||_.init(_.me=t)
			
			
            if ("onhashchange" in window) {
                window.onhashchange = function() {
                    var cHash = location.hash
                    if (_.routes.length == 0) {
                        _.useAnimation ? _.animation(_.animationType, _.animationSpeed) : false
                    }
                    else {
                        _.useAnimation ? _.animation(_.animationType, _.animationSpeed) : false
                    }
                }
            }
            else {
                /*
                 * jQuery hashchange event - v1.3 - 7/21/2010
                 * http://benalman.com/projects/jquery-hashchange-plugin/
                 * 
                 * Copyright (c) 2010 "Cowboy" Ben Alman
                 * Dual licensed under the MIT and GPL licenses.
                 * http://benalman.com/about/license/
                 */
                
                ;(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

                $(window).hashchange(function() {
			        location.hash.slice(0,_.hashLen) == _.hash ? _.useAnimation?_.animation(_.animationType,_.animationSpeed, location.hash):_.setActive() : false
			    });
            }
		})
		return this
	}
}(jQuery));