/* ===== $ scripts =============================================================================================================
   Author: Gab Labelle http://www.gablabelle.com
   Credits:
   1) Many thanks to David DeSandro for his help and his great isotope jQuery plugin! http://desandro.com
   2) Many thanks to Dmitry for his help and his great royalSlider jQuery plugin! http://dimsemenov.com/
   3) This project wouldn't of been possible without all the help of the great folks at http://www.stackoverflow.com
   ============================================================================================================================= */

/*** Isotope Gutter ***/
$.Isotope.prototype._getMasonryGutterColumns = function() {
 	var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	var containerWidth = this.element.width();
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
		this.$filteredAtoms.outerWidth(true) ||
		containerWidth;
	this.masonry.columnWidth += gutter;
	this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
	this.masonry.cols = Math.max( this.masonry.cols, 1 );
};

$.Isotope.prototype._masonryReset = function() {
	this.masonry = {};
	this._getMasonryGutterColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push( 0 );
	}
};
$.Isotope.prototype._masonryResizeChanged = function() {
	var prevSegments = this.masonry.cols;
	this._getMasonryGutterColumns();
	return ( this.masonry.cols !== prevSegments );
};
/*** Isotope layout ***/
$(document).ready(function(){
	var layoutI = 0;
	var $container = $("#stream");
	var $window = $(window);
	var $imgs = $("img");
	var $menu = $("#menu-archives li.staysexy a");
	$imgs.lazyload({ 
		effect : "fadeIn",
		failure_limit : Math.max($imgs.length-1, 0),
		threshold : 1000
	});
	function windowSizeMe(){
		var windowSize = $window.width();
		if (windowSize > 1199) {
		    $("#switch").attr("data-content", "bigger");
		} else if (windowSize < 1200 && windowSize > 979) {
		    $("#switch").attr("data-content", "big");
		} else if (windowSize < 768) {
		    $("#switch").attr("data-content", "small");
		} else {
		    $("#switch").attr("data-content", "medium");
		};
	}; 
	function reLayout(){
		windowSizeMe(); 
		var mediaQueryId = $("#switch").attr("data-content");
		var mediaQueryId = mediaQueryId.replace( /"/g, '' );
		var masonryOpts;
		switch ( mediaQueryId ) {
			case 'bigger' :
				masonryOpts = {
					columnWidth: 270,
					gutterWidth: 30
				};
			break;
			case 'big' :
				masonryOpts = {
					columnWidth: 220,
					gutterWidth: 20
				};
			break;
			case 'medium' :
				masonryOpts = {
					columnWidth: 166,
					gutterWidth: 20
				};
			break;
			case 'small' :
				masonryOpts = {
					columnWidth: $container.width() / 2,
					gutterWidth: 0
				};	
			break;
		};
		$container.isotope({
			resizable: false,
			itemSelector : "article.photos",
			animationEngine: "best-available",
			masonry: masonryOpts,
			onLayout: function() {
				forceLoad();
				setTimeout(function(){
					html_height = $container.height();
					$("#sidebar").height(html_height - masonryOpts.gutterWidth);
				}, 500);
			}
		});
	};
	$container.imagesLoaded( function(){
		reLayout();
		$window.smartresize( reLayout );
	});
	function relayoutAgain(){
		$container.imagesLoaded( function(){
			$container.isotope("reLayout");
		});
	};
/*    $menu.on("click",function() {
    	event.preventDefault();
		var	link = $(this).attr("href"),
			toRemove = ajax_object.url,
			rewritepath = link.replace(toRemove,"");
		$.address.state(ajax_object.path).crawlable(true).value(rewritepath);
		var cat = $(this).text().toLowerCase();
		$menu.removeClass("active");
		$("#menu-all a").removeClass("active");
		$(this).addClass("active");
		$("article.photo").addClass("forcesmall");
		$container.isotope({ filter: "."+cat });
		setTimeout(function(){
	        relayoutAgain();	
	    },500);
    });
    $("#menu-all a").on("click",function() {
    	event.preventDefault();
		var	link = $(this).attr("href"),
			toRemove = ajax_object.url,
			rewritepath = link.replace(toRemove,"");
		$.address.state(ajax_object.path).crawlable(true).value(rewritepath);
		$menu.removeClass("active");
		$(this).addClass("active");
		$("article.photo").removeClass("forcesmall");
		$container.isotope({ filter: ".photos" });
		setTimeout(function(){
	        relayoutAgain();	
	    },500);
    });*/
});
/*** Slider & address ***/
$(document).ready(function(){
	var $slider = $(".royalSlider").royalSlider({
		imageScalePadding: 10,
		slidesSpacing: 15,
		autoScaleSlider: true,
		minSlideOffset: 70,
		controlNavigation: 'none',
		arrowsNavHideOnTouch: true,
		keyboardNavEnabled: true,
		transitionSpeed: 650,
		easeInOut: 'easeOutQuint',
		easeOut: 'easeOutCubic',
		globalCaption: true,
		deeplinking: {enabled: true},
		autoPlay: {
    		enabled: true,
    		pauseOnHover: false,
    		delay: 5000,
    	}
	});
	var slider = $slider.data("royalSlider");
	var socialplug = $("#social");
	$.Shortcuts.add({
	    type: 'down',
	    mask: 'Esc',
	    handler: function() {
	        $slider.fadeOut(100);
			$.Shortcuts.stop('theatre');
			$("#watermark,#social,#loader").fadeOut(100);
			slider.stopAutoPlay();
			gameOver();
	    },
	    list: 'theatre'
	}).add({
	    type: 'down',
	    mask: 'Enter',
	    handler: function() {
	        slider.enterFullscreen();
	    },
	    list: 'theatre'
	}).add({
	    type: 'down',
	    mask: 'Space',
	    handler: function() {
			slider.toggleAutoPlay();
	    },
	    list: 'theatre'
	}).add({
	    type: 'down',
	    mask: 'Up',
	    handler: function() {
	        slider.goTo(0);
	    },
	    list: 'theatre'
	}).add({
	    type: 'down',
	    mask: 'Down',
	    handler: function() {
	        slider.goTo(slider.numSlides-1);
	    },
	    list: 'theatre'
	});
	$.Shortcuts.add({
	    type: 'down',
	    mask: '4',
	    handler: function() {
	        $(".container,.row").removeClass("five");
	        setTimeout(function(){
	        	relayoutAgain();	
	        },500);
	    }
	}).add({
	    type: 'down',
	    mask: '5',
	    handler: function() {
	        $(".container,.row").addClass("five");
	        setTimeout(function(){
	        	relayoutAgain();	
	        },1000);
	    }
	}).start();
	function gameOver(){
		if (window.history && window.history.pushState){
			$.address.state(ajax_object.path).crawlable(true).value(ajax_object.path);
			//FB.XFBML.parse(document.getElementById(socialplug));
		}
		else {
			window.location.hash = "#";
			//FB.XFBML.parse(document.getElementById(socialplug));
		}
	}
	var url = window.location.href;
		postname = getLastSegmentOfPath(url);
		slider.stopAutoPlay();
	//	if (postname == window.location.hostname) {
	//	}
		if (url.search("/photo/") > 0) {
			slide = $("article a[data-postname='" + postname + "']").data("slider");
			slider.st.transitionSpeed = 0;
			$.Shortcuts.start('theatre');
			slider.goTo(slide);
			$slider.fadeIn(300);
			$("#watermark,#social").fadeIn(300);
			setTimeout(function(){
				slider.st.transitionSpeed = 700;
			}, 10);
		}
	slider.ev.on('rsAfterSlideChange', function(event) {
		var whereiam = slider.currSlide.caption[0].data;
		var whereiampath = '/photo/' + whereiam;
		var whereiamurl = ajax_object.url + '/photo/' + whereiam;
		if ($slider.is(":visible")) {
			$.address.state(ajax_object.path).crawlable(true).value(whereiampath);
			//FB.XFBML.parse(document.getElementById(socialplug));
		}
	});
	$("a.ajaxed").on("click",function(event) {
		event.preventDefault();
		var photo = parseInt( $(this).attr("data-slider"),10),
			link = $(this).attr("href"),
			toRemove = ajax_object.url,
			rewritepath = link.replace(toRemove,"");
		//console.log(rewritepath);
		slider.st.transitionSpeed = 0;
		slider.goTo(photo);
		$.Shortcuts.start('theatre');
		//if (photo == 0) {
			$.address.state(ajax_object.path).crawlable(true).value(rewritepath);
			//FB.XFBML.parse(document.getElementById(socialplug));
		//}
		//console.log(rewritepath);
		$slider.fadeIn(300);
		$("#watermark,#social").fadeIn(300);
		setTimeout(function(){
			slider.st.transitionSpeed = 700;
		}, 10);
	});
	$("#watermark a").on("click",function(event) {
		event.preventDefault();
		$slider.fadeOut(100);
		$.Shortcuts.stop('theatre');
		$("#watermark,#social,#loader").fadeOut(100);
		slider.stopAutoPlay();
		gameOver();
	});
	replaceMenu();
	$(".container").fitVids();
});
/*** Functions ***/
function forceLoad(){
	$(window).trigger("scroll");
};
function getLastSegmentOfPath(url) {
    var matches = url.match(/\/([^\/]+)\/?$/);
    if (matches) {
        return matches[1];
    }
    return null;
}
function replaceMenu(){
	$("body").on("contextmenu","img", function(e){
		return false;
	});
	$("body").on("mousedown","img", function(e){
		return false;
    });
};
$(window).load(function(e){
	forceLoad();
	$("#loader").fadeOut(300);
});