// Maraschino.js 
// by Liz Myers
// May 27, 2015
var mySet;

$(document).on('pagecreate', '#bbGrid', function() {

	//Isotope, lazy loading, and ajax   
	//http://plnkr.co/edit/4ztirik2820BxKt1Yfl4?p=preview  

	//INIT
	
	var max = 50,
		min = 0,
		icons,
		$container = $('#container');

	var allSets = JSON.parse(localStorage.getItem("allSets"));

	if (allSets == null || allSets == 'undefined' || allSets == '') {
		$('#bbGrid').hide();
		grabIcons();
	} else {
		Utils.displayIcons(allSets);
	}

	function finishedLoadingData() {

		console.log("init isotope");
		$('#container').isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows',
			filter: '.nature.travel',
			getSortData: {
				number: '.number',
				title: '[data-title]',
				name: '.name',
				author: '.set',
				selected: '.mypicks',
				category: '[data-category]'
			}
		});
		//reload document
		location.reload();
	};

	function grabIcons() {
			$.ajax({
				type: 'GET',
				url: 'resources/data/allSets.json',
				success: function(data) {
					var allSets = data;
					var stringifiedData = JSON.stringify(data);
					localStorage.setItem("allSets", stringifiedData);
					Utils.displayIcons(allSets);
				},
				error: function() {
					alert('Loading Failed...');
				},
				complete: function() {
				finishedLoadingData();
				}
			});
		} //grabIcons

	$('#simple-menu').sidr({
		//side: 'right',
		speed: 200
	});

	var sliderIsOpen = localStorage.getItem("mSlider");
	if ((sliderIsOpen == 'undefined') || (sliderIsOpen == '') || (sliderIsOpen == "closed")) {
		sliderIsOpen == "closed";
	} else {
		sliderIsOpen == "open";
		$('#simple-menu').trigger('click');
		localStorage.setItem("mSlider", "open");
	}

	$(window).resize(function() {
		console.log("resized window");
		$('#container').isotope('layout');
	});

	//set colour of default menus to show defaults
	$('#allIcons').find('a').addClass('selected').find('i').addClass('selected');
	$('#allIcons').find('#iconsTotal').addClass('selected');

	var theme = localStorage.getItem('theme');
	if (theme == "steel-blue") {
		$('.menu #steel-blue').find('a').addClass('selected').find('i').addClass('selected');
	} else if (theme == "light-theme") {
		$('.menu #light-theme').find('a').addClass('selected').find('i').addClass('selected');
	} else {
		$('.menu #dark-theme').find('a').addClass('selected').find('i').addClass('selected');
	}

	$('#view-all').css('background', '#f46666').css('color', 'white');
	$('#view-all i').css('color', 'white');

}); //end pagecreate

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', '#bbGrid', function() {

	/////////////////////////////// INIT VARS //////////////////////////////////////

	var myCount = JSON.parse(localStorage.getItem('myCount'));
	console.log("MyCount: " + myCount);

	if (myCount !== 'undefined' && myCount !==' ' && myCount !== null) {
		$('#picksTotal').text(myCount);
	} else {
		myCount = 0;
		$('#picksTotal').find('.countTxt').text(myCount);
	}
	var $container = $('#container');
	var $item = $('#container .item');

	/////////////////////////////// OPEN LIBRARY ////////////////////////////////////////////  
	
	function openMySet() {
		console.log("called openMySet");
		var mySet = localStorage.getItem('mySet');
		console.log("mySet= " +mySet);

		if(mySet == ' ' || mySet == null || mySet == 'faSet') {
			$('#faSet').trigger('click');
			mySet == 'faSet';
			localStorage.setItem('mySet', mySet);
		} else if (mySet == 'mdSet') {
			$('#mdSet').trigger('click');
		} else if (mySet == 'glyphSet') {
			$('#glyphSet').trigger('click');
		} else if (mySet == 'ionicSet') {	
			$('#ionicSet').trigger('click');
		}
	}

	setTimeout(function(){
		console.log("opening my set");
		 openMySet();
		}, 3000);
    
	/////////////////////////////// CLICK TILES ////////////////////////////////////////////  

	$item.on('click', function(evt) {
		evt.preventDefault();
		var $this = $(this);
		var myCount = localStorage.getItem('myCount');
		console.log("New Count: " + myCount);
		var $myPicksArray = localStorage.getItem('myPicksArray');
		console.log($myPicksArray);

		if (($myPicksArray) && ($myPicksArray !=='undefined') && ($myPicksArray !==' ')&& ($myPicksArray !==null)) {
			$myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
		} else {
			var $myPicksArray = [];
			myCount = 0;
			$('#myPicks').find('.countTxt').text = '0';
		}

		$this.toggleClass('mypicks');

		//remove items that were deselected
		var myPicksFilterStatus = $('#showMyPicks').attr('class');
		var myPicks = $this.find('b').attr('class');

		if ((myPicks !== "faveHide") && (myPicksFilterStatus == "selected")) {
			$('#container').isotope({
				filter: '.mypicks'
			});
		}

		//change star color = red/light-theme else yellow
		var $icon = $this.find($('b'));
		var isSelected = $('.menu #steel-blue ').find('a').attr('class');

		if (isSelected == "ui-link selected") {
			$icon.toggleClass('faveShow');
			$icon.css('color', '#fc0');
		} else {
			$icon.toggleClass('faveShow');
			$icon.css('color', '#f46666');
		}
		var $number = $this.find('.number').text();
		var $name = $this.find('.name').text();
		var $star = $this.find('b').attr('class');

		//unfave = remove from array
		if ($star !== "md-star faveShow") {

			var $myDiscard = $myPicksArray.indexOf($number);

			$myPicksArray.splice($myDiscard, 1);

			localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
			myCount--;
			if (myCount <= 0) {
				localStorage.removeItem("myPicksArray");
			}
		} else {
			$myPicksArray.push($number);
			localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
			myCount++;

		}
		//update myPicks count for this set
		$('#myCount').text(myCount);
		localStorage.setItem("myCount", myCount);

		myCount = JSON.parse(localStorage.getItem('myCount'));
		var picksTotal = JSON.stringify(myCount);
		$('#myPicks').find('.countTxt').text(picksTotal);
		

	}); //end item onClick

}); //end pagebeforeshow

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#bbGrid', function() {

	$('#simple-menu').trigger('click');
	sliderIsOpen = 1;
	localStorage.setItem("sliderIsOpen", true);

	/////////////////////////////// SEARCH ////////////////////////////////////////////
	
	$('#search').on('keyup', function() {
		$('#btnClear').css({
			'visibility': 'visible'
		});
		return false;
	});

	$('input').on("keyup", function(e) {
		if ($(this).val().length > 2 || e.keyCode == 13) {
			event.preventDefault();
			$('#view-my-picks').css('background', 'none').css('color', '#ccc');
			$('#view-my-picks i').css('color', '#ccc');
			$('#view-all').css('background', 'none');
			$('#view-all').css('color', '#ccc');
			$('#totals *').removeClass('selected');
			$('#setGroup li *').removeClass('selected');
			$('#filterGroup li *').removeClass('selected');
			$('#btnClearLibraries').css('color', '#555');
			$('#btnClearCategories').css('color', '#555');
			$('#clearSearch').show();
			var kwd = $('input').val();
			var mySet="ionicSet";

			//IF SEARCH IS EMPTY 
			if (kwd == ' ' || !kwd || kwd == 'undefined') {
				$('#clearSearch').hide();
				$('#container').isotope({
					filter: '*'
				});
				$('#showAll *').css('color', '#fff');
			} else {
				$('#container').isotope({
					filter: ':contains(' + kwd + ')' 

				});
				$('#setGroup').find('a').removeClass('selected').find('i').removeClass('selected');
			}
		}
		return false;
	});

$('#clearSearch').on('click', function() {
	var mySet = localStorage.getItem('mySet');

	if(mySet  == 'faSet') {
		$('#faSet').trigger('click');
	} else if (mySet == 'mdSet') {
		$('#mdSet').trigger('click');
	} else if (mySet == 'glyphSet') {
		$('#glyphSet').trigger('click');
	} else if (mySet == 'ionicSet') {	
		$('#ionicSet').trigger('click');
	}

	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});

	$('#search').val('');
	$(this).hide();
	
});

	/////////////////////////////// TRIGGER MENUS ////////////////////////////////////////////

	$('#clearSearch').hide();

	//restore menu states
	menuStates();

	//restore colour scheme
	var theme = localStorage.getItem('theme');

	if ((theme == '')) {
		theme = "dark-theme";
		changeColorScheme("dark-theme");
	} else {
		changeColorScheme(theme);
	}
 
 	var firstOpen = localStorage.getItem('mySet');
 	if (mySet == null) {
 		$("#faSet").find('a').addClass('selected').find('i').addClass('selected');
		$("#faSet").find('.countTxt').addClass('selected');
 	}

}); //end bbGrid pageshow

////////////////////////////////////////////////////////////////////////////////////
//////////////////             GLOBAL                  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function menuStates() {

		var mClr = localStorage.getItem("mClr");
		var mSet = localStorage.getItem("mSet");
		var mBrowse = localStorage.getItem("mBrowse");

		if ((!mClr) || (mClr == '') || (mClr == "open")) {
			$('#colorToggle').trigger('click');
		}

		if ((!mSet) || (mSet == '') || (mSet == "open")) {
			$('#setToggle').trigger('click');
		}

		if ((!mBrowse) || (mBrowse == '') || (mBrowse == "open")) {
			$('#browseToggle').trigger('click');
		}

	} //function menu states

//slider-menu

$('#simple-menu').on('click', function() {

	var sliderIsOpen = localStorage.getItem('mSlider');
	console.log("sliderIsOpen= " + sliderIsOpen);

	if (sliderIsOpen == "open") {
		localStorage.setItem('mSlider', "closed");
	} else if (sliderIsOpen == "closed") {
		localStorage.setItem('mSlider', "open");
	}
});

//////////////////////////// TOGGLE MENUS /////////////////////////////////	

$('#colorGroup').hide();
$('#colorToggle').on('click', function() {
	$('#colorToggle i').toggleClass('fa-rotate-270');
	$('#colorGroup').slideToggle('fast');
	if ($('#colorToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mClr', "open");
	} else {
		localStorage.setItem('mClr', "closed");
	}
});
$('#setGroup').hide();
$('#setToggle').on('click', function() {
	$('#setToggle i').toggleClass('fa-rotate-270');
	$('#setGroup').slideToggle('fast');
	if ($('#setToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mSet', "open");
	} else {
		localStorage.setItem('mSet', "closed");
	}
});
$('#filterGroup').hide();
$('#browseToggle').on('click', function() {
	$('#browseToggle i').toggleClass('fa-rotate-270');
	$('#filterGroup').slideToggle('fast');
	if ($('#browseToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mBrowse', "open");
	} else {
		localStorage.setItem('mBrowse', "closed");

	}
});

/////////////////////// SWIPE OPEN/CLOSE  /////////////////////////////			

$('#container').on('swiperight', function() {
	$.sidr('open', 'sidr');
	preventDefaultEvents: false;
});

$('#container').on('swipeleft', function() {
	$.sidr('close', 'sidr');
	preventDefaultEvents: false;
});


//////////////////////////// FILTERS /////////////////////////////////////	

$('.showMyPicks').on('click', function() {

	$('#container').isotope({
		filter: '.mypicks'
	});

	$('#setGroup li *').removeClass('selected');
	$('#myPicks *').addClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#filterGroup li *').removeClass('selected');
	$('#btnClearCategories').css('color', '#555');
});


$('#clearMyPicks').on('click', function(){
	console.log("clicked clearMyPicks");
	$('#myNotifyDialog').popup("open");
      $(".cover").fadeTo(500, 0.5);
});

$('.myNotifyCancelBtn').on('click', function(){
	console.log("clicked cancel");
	$('#myNotifyDialog').popup("close");
	$(".cover").fadeTo(500, 0).hide();
});

$('.myNotifyOkBtn').on('click', function(){
	console.log("clicked OK");
	var currentSet = localStorage.getItem('mySet');
	clearAllMyPicks();
});

function clearAllMyPicks() {

	var myCount = localStorage.getItem('myCount');
	var $myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	while (myCount > 0) {
		var $number = $myPicksArray[myCount];
		var $myDiscard = $myPicksArray.indexOf($number);
		$myPicksArray.splice($myDiscard, 1);
		myCount--;

	}
	localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
	localStorage.setItem('myCount', myCount);
	console.log("myPicksArray " + $myPicksArray +', myCount: '+myCount);
	$('#container *').find('b').removeClass('faveShow');
	$('#container *').removeClass('mypicks');
	$('#picksTotal').text(myCount);

	setTimeout(function(){
		var mySet = localStorage.getItem('mySet');

		if(mySet  == 'faSet' || mySet == null) {
			$('#faSet').trigger('click');
		} else if (mySet == 'mdSet') {
			$('#mdSet').trigger('click');
		} else if (mySet == 'glyphSet') {
			$('#glyphSet').trigger('click');
		} else if (mySet == 'ionicSet') {	
			$('#ionicSet').trigger('click');
		}

		$('#container').isotope({
			 filter: ':contains('+mySet+')'
		});

		$('#myNotifyDialog').popup("close");
		$(".cover").fadeTo(500, 0).hide();

	}, 1000);	

}
	 
$('#filterGroup > li').on('click', this, function() {
	var catSelector = $(this).attr('data-category-value');
	if (catSelector == "*") {
		$('#showAll *').css('color', '#fff');
	} else {
		$('#showAll *').css('color', '#999');
		$('#btnClearCategories').css('color', '#fc6');
	}
	$('#container').isotope({
		filter: catSelector
	});
	$('#showMyPicks *').removeClass('selected');
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).siblings().find('span').removeClass('selected');
	$(this).siblings().find('countTxt').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).find('span').addClass('selected');
	$(this).find('countTxt').addClass('selected');
	$('#setGroup *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#showMyPicks *').css('color', '#999');
	$('#totals li *').removeClass('selected');
	$('#view-all').css('background', 'none').css('color', '#ccc');
	$('#view-all *').css('color', '#ccc');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
	$('#btnClearLibraries').css('color', '#555');
});

$('#btnClearCategories').on('click', function() {
	$('#filterGroup *').removeClass('selected');
	$(this).css('color', '#666');
	var mySet = localStorage.getItem('mySet');

	if(mySet  == 'faSet') {
		$('#faSet').trigger('click');
	} else if (mySet == 'mdSet') {
		$('#mdSet').trigger('click');
	} else if (mySet == 'glyphSet') {
		$('#glyphSet').trigger('click');
	} else if (mySet == 'ionicSet') {	
		$('#ionicSet').trigger('click');
	}

	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
});

$('#logo').on('click', function() {
	console.log("clicked logo");
      window.open("http://maraschino.lizmyers.webfactional.com/index.html", "_parent");
});
$('#home').on('click', function() {
	console.log("clicked infoBtn");
      window.open("http://maraschino.lizmyers.webfactional.com/index.html", "_parent");
});

$('#download').on('click', function() {
	alert("New Features Coming Soon \n 1) Download icon font \n 2) Download SVG icons");
});

$('#print').on('click', function() {
	//window.open("http://maraschino.lizmyers.webfactional.com/picksList.html", "_blank");
	window.open("http://localhost:3000/picksList.html", "_blank");
});

///////////////////////// SELECT LIBRARY /////////////////////////////////		

$('#mdSet').on('click', function() {
	var mySet = "mdSet";
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#filterGroup li *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#btnClearCategories').css('color', '#555');
});

$('#faSet').on('click', function() {
	var mySet="faSet";
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#filterGroup *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#btnClearCategories').css('color', '#555');
});

$('#glyphSet').on('click', function() {
	var mySet="glyphSet";
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearCategories').css('color', '#999');
	$('#filterGroup *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#btnClearCategories').css('color', '#555');
});

$('#ionicSet').on('click', function() {
	var mySet="ionicSet";
	console.log("clicked "+ mySet);
	$('#container').isotope({
	  filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearCategories').css('color', '#999');
	$('#filterGroup *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#btnClearCategories').css('color', '#555');
});


///////////////////////// CHANGE COLOURS /////////////////////////////////	

$('#light-theme').on('click', function() {
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$('#container .item').find('b').css('color', '#f46666');
	localStorage.setItem('theme', "light-theme");
	changeColorScheme("light-theme");
});

$('#steel-blue').on('click', function() {
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$('#container .item').find('b').css('color', '#edb110');
	localStorage.setItem('theme', "steel-blue");
	changeColorScheme("steel-blue");
});

$('#dark-theme').on('click', function() {
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$('#container .item').find('b').css('color', '#f46666');
	localStorage.setItem('theme', "dark-theme");
	changeColorScheme("dark-theme");
});

function changeColorScheme(theme) {

		//clear all
		$('.ui-page-active').css('background', 'black');
		$('.ui-content').css('background', 'black');
		$('#container').removeClass('lt-container').removeClass('steelblue-container');
		$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
		$('.glyph i').removeClass('lt-txt-glyph');
		$('#container .item .number').removeClass('lt-txt-bold30');
		$('#container .item .name').removeClass('lt-txt-bold30');
		$('#container .item .code').removeClass('lt-txt');
		$('#container .item .faveShow').removeClass('lt-fave');

		switch (theme) {

			case "light-theme":
				$('.gridView').css('background', 'whitesmoke');
				$('.ui-content').css('background', 'whitesmoke');
				$('#container').addClass('lt-container');
				$('#container .item').addClass('lt-item');
				$('.glyph i').addClass('lt-txt-glyph');
				$('#container .item .number').addClass('lt-txt-bold30');
				$('#container .item .name').addClass('lt-txt-bold30');
				$('#container .item .code').addClass('lt-txt');
				$('#container .item .faveShow').addClass('lt-fave');
				break;

			case "steel-blue":
				$('#container').addClass('steelblue-container');
				$('#container .item').addClass('steelblue-item');
				$('#container .item .faveShow').removeClass('lt-fave');
				$('#container .item .faveShow').css('color', '#edb110');
				break;

			case "dark-theme":
				$('#container').removeClass('lt-container').removeClass('steelblue-container');
				$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
				$('.glyph i').removeClass('lt-txt-glyph');
				$('#container .item .number').removeClass('lt-txt-bold30');
				$('#container .item .name').removeClass('lt-txt-bold-30');
				$('#container .item .code').removeClass('lt-txt');
				$('#container .item .faveShow').removeClass('lt-fave');
				$('#container .item .faveShow').css('color', '#f46666');
				break;

			default:
				$('#container').removeClass('lt-container').removeClass('steelblue-container');
				$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
				$('.glyph i').removeClass('lt-txt-glyph');
				$('#container .item .number').removeClass('lt-txt-bold30');
				$('#container .item .name').removeClass('lt-txt-bold-30');
				$('#container .item .code').removeClass('lt-txt');
				$('#container .item .faveShow').removeClass('lt-fave');
				$('#container .item .faveShow').css('color', '#f46666');

				break;
		} //end switch	
	} //end colour change function