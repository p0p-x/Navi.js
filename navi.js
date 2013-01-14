;(function($){
	$.fn.navi = function(o){
		this.each(function() {
			var t=$(this),
				d=t.data("navi"),
				_={
					hash:"#!/",
					content: $("#content"),
					hrefs: $([]),
					pages: [],
					defaultPage:true,
					defaultPageHash:true,
					useAnimation:true,
					animationSpeed:100,
					init:function() {
						_.menu=$(">ul>li",_.me)
						_.cont=$(">ul>li",_.content)
						_.hashLen=_.hash.length
						_.loadHref()
						_.loadPages()
						_.defaultPage?_.loadDefault():false
						_.hideOther()
						_.setActive()			
					},
					hideOther:function(){
						_.cont.each(function(e){
							$(e).hasClass("active")?$(e).siblings().removeClass("active").css('display','none'):false
						})
					},
					loadHref:function(){
						_.menu.each(function(n,e) {
							_.hrefs[n]=$("> a",e).attr("href")
						})
					},
					loadPages:function(){
						_.hrefs.each(function(n){
							_.pages[n]=$(this).slice(_.hashLen)
						})
					},
					loadDefault:function(){
						_.menu.each(function(i,e){
							if ($(e).hasClass("active")){
								_.cont.each(function(n,el){ 
									var a = $(el).attr("id")
									if ($(">a",e).attr("href").slice(_.hashLen)==a){
										$(el).siblings().css("display","none")
										$(el).addClass("active").siblings().removeClass("active")
									}
								})
							}
						})
					},
					setActive:function(){
						var ids = [],
							links = [],
							curHash = location.hash.slice(_.hashLen);
					
						_.cont.each(function(n,e){
							ids[n] = $(e).attr("id")
							if (curHash==ids[n]&&location.hash.slice(0,_.hashLen)==_.hash){
								$(e).fadeIn().addClass("active").siblings()
								.css("display","none").removeClass("active")
							}
						})
						_.menu.each(function(n,e){
							links[n]=$(">a",e).attr("href").slice(_.hash.length)
							if (curHash==links[n]){
								$(e).addClass("active").siblings().removeClass("active")
							}
						})
					},
					debug:function(str){
						console.log(str)
					},
					animation:function(s,cb){
						_.cont.each(function(n,e){
							var h = $(e).height()
							$(e).attr('height',h)
							_.content.stop().animate({
								height: "0"
							},s,function() {
								_.setActive()
								_.cont.each(function(n,e){
									if ($(e).hasClass("active")){
										_.content.stop().animate({
											height: Number($(e).attr("height"))+5+"px"
										},s,cb)
									}
								})
							})
						})
						
						$(window).bind("resize",function(){
							_.cont.each(function(i,e){
								if ($(e).hasClass("active")){
									_.activeHeight=$(e).height()
									_.content.stop().animate({
										height: Number(_.activeHeight)+5+"px"
									},s)
								}
							})
						})
					}
				}
			d?_=d:t.data({navi: _})
			if (typeof o == 'object'){
				$.extend(_,o);
			}
			_.me||_.init(_.me=t)
			
			$(window).hashchange(function(){
				location.hash==_.hash?_setActive():_.useAnimation?_.animation(_.animationSpeed):_.setActive();
			})
		})
		return this
	}
})(jQuery);