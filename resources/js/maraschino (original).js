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

	/////////////////////////////// OPEN LIBRARY ////////////////////////////////////////////  

	var mySet = localStorage.getItem('mySet');
	console.log("mySet= " +mySet);

	if(!mySet || mySet == ' ' || mySet == null ) {
		mySet == 'faSet';
		localStorage.setItem('mySet', 'faSet');
		$('#faSet').trigger('click');
		$('#faSet').find('a').addClass('selected').find('i').addClass('selected');
		$('#container').isotope({
		    filter: ':contains(faSet)'
		});
	} else if (mySet == 'mdSet') {
		$('#mdSet').trigger('click');
	} else if (mySet == 'glyphSet') {
		$('#glyphSet').trigger('click');
	} else if (mySet == 'ionicSet') {	
		$('#ionicSet').trigger('click');
	}

}); //end pagebeforeshow

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#bbGrid', function() {

	$('#simple-menu').trigger('click');
	sliderIsOpen = 1;
	localStorage.setItem("sliderIsOpen", true);

	$('#faSet').find('a').addClass('selected').find('i').addClass('selected');
	$('#faSet').find('.countTxt').addClass('selected');

	/////////////////////////////// SEARCH ////////////////////////////////////////////

	$('#search').on('keyup', function() {
		$('#btnClear').css({
			'visibility': 'visible'
		});
		return false;
	});

	$('input').on("keyup", function(event) {
		if (event.keyCode === 13) {
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
		$('#view-all').css('background', '#f46666');
		$('#view-all').css('color', '#fff');
		$('#view-all .bb-infinity').css('color', '#fff');
		$('#totals #allIcons *').addClass('selected');
		$('#search').val('');
		$('#container').isotope({
			filter: '*'
		});
		$(this).hide();
		return false;
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

}); //end bbGrid pagecreate



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

/////////////////////// DOWNLOAD FILES  /////////////////////////////	

$('#btnDownloadFiles').on('click', function(e) {
	e.preventDefault();
	location.href = "http://maraschino.lizmyers.webfactional.com/icon-fonts.zip";
	return false;
});

//////////////////////////// FILTERS /////////////////////////////////////	

$('.showMyPicks').on('click', function() {
	
	$('#myPicks *').addClass('selected');
	$('#container').isotope({
		filter: '.mypicks'
	});
	$('#clearSearch').hide();
	$('#search').val('');
	$('#setGroup li *').removeClass('selected');
	$('#filterGroup li *').removeClass('selected');
	$('#btnClearLibraries').css('color', '#555');
	$('#btnClearCategories').css('color', '#555');
	$('#view-my-picks').css('background', '#f46666').css('color', '#fff');
	$('#view-my-picks i').css('color', '#fff');
	$('#view-all i').css('color', '#ccc');
	$('#view-all').css('background', 'none').css('color', '#ccc');
});


function clearAllMyPicks() {
	var myCount = 0;
	$('#btnCancel').trigger('click');
	localStorage.removeItem("myCount");
	localStorage.removeItem("myPicksArray");
	$('#showMyPicks *').removeClass('selected');
	$('#allIcons').css({'color': '#f46666'});
	$('#myPicks').css({'color': '#999'});
	$('#container *').find('b').removeClass('faveShow');
	$('#container *').removeClass('mypicks');
	localStorage.setItem("myCount", myCount);
	$('#picksTotal').text("0");
	$('#container').isotope({
		filter: '*'
	});
	$('#view-all').css('background', '#f46666').css('color', '#fff');
	$('#view-all *').css('color', '#fff');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#totals li *').removeClass('selected');
	$('#allIcons *').addClass('selected');
	$('#btnClearCategories').trigger('click');
	$('#btnClearLibraries').trigger('click');
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
	$('#container').isotope({
		filter: '*'
	});
	$('#filterGroup *').removeClass('selected');
	$('#allIcons *').addClass('selected');
	$('#view-all').css('background', '#f46666').css('color', '#fff');
	$('#view-all *').css('color', '#fff');
	$(this).css('color', '#666');
});

$('#download').on('click', function() {
	alert("Temporarily disabled");
});

$('#print').on('click', function() {
	//window.open("http://maraschino.lizmyers.webfactional.com/picksList.html", "_blank");
	window.open("http://localhost:3000/picksList.html", "_blank");
});

///////////////////////// SELECT LIBRARY /////////////////////////////////		
//var mySet = 'faSet';
$('#myPicks').on('click', function() {
	localStorage.setItem('mySet', 'myPicks');
	var mySet = localStorage.getItem('mySet');
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains(faveShow)'
	});
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	
	$('#filterGroup li *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
	//$('#btnClearCategories').css('color', '#555');
});

$('#clearMyPicks').on('click', function(){
	console.log("clicked clearMyPicks");
	$('#myNotifyDialog').popup("open");
});

$('.myNotifyCancelBtn').on('click', function(){
	console.log("clicked cancel");
	$('#myNotifyDialog').popup("close");
});

$('.myNotifyOkBtn').on('click', function(){
	console.log("clicked OK");
	var myPicksArray = [];
	var currentSet = localStorage.getItem('mySet');
	switch (currentSet) {
		case 'faSet':
			$('#faSet').trigger('click')
		break;
		case 'glyphSet':
			$('#glyphSet').trigger('click')
		break;
		case 'ionicSet':
			$('#ionicSet').trigger('click')
		break;
		case 'mdSet':
			$('#mdSet').trigger('click');
		break;
	}
	localStorage.setItem('myPicksArray', myPicksArray);
	$('#myNotifyDialog').popup("close");
});

$('#mdSet').on('click', function() {
	localStorage.setItem('mySet', 'mdSet');
	mySet = "mdSet";
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearLibraries').css('color', '#fc6');
	$('#filterGroup li *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#totals li *').removeClass('selected');
	$('#view-all').css('background', 'none').css('color', '#ccc');
	$('#view-all *').css('color', '#ccc');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
	$('#btnClearCategories').css('color', '#555');
});

$('#faSet').on('click', function() {
	localStorage.setItem('mySet', 'faSet');
	console.log("clicked " + mySet);
	mySet="faSet";
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearLibraries').css('color', '#fc6');
	$('#filterGroup *').removeClass('selected');
	$('#allIcons').find('a').removeClass('selected').find('i').removeClass('selected');
	$('#allIcons').find('#iconsTotal').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#totals li *').removeClass('selected');
	$('#view-all').css('background', 'none').css('color', '#ccc');
	$('#view-all *').css('color', '#ccc');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
	$('#btnClearCategories').css('color', '#555');
});

$('#glyphSet').on('click', function() {
	localStorage.setItem('mySet', 'glyphSet');
	mySet="glyphSet";
	console.log("clicked " + mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearLibraries').css('color', '#fc6');
	$('#btnClearCategories').css('color', '#999');
	$('#filterGroup *').removeClass('selected');
	$('#allIcons').find('a').removeClass('selected').find('i').removeClass('selected');
	$('#allIcons').find('#iconsTotal').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#totals li *').removeClass('selected');
	$('#view-all').css('background', 'none').css('color', '#ccc');
	$('#view-all *').css('color', '#ccc');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
	$('#btnClearCategories').css('color', '#555');
});

$('#ionicSet').on('click', function() {
	localStorage.setItem('mySet', 'ionicSet');
	mySet="ionicSet";
	console.log("clicked " + mySet);
	$('#container').isotope({
	  filter: ':contains('+mySet+')'
	});
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	$('#btnClearLibraries').css('color', '#fc6');
	$('#btnClearCategories').css('color', '#999');
	$('#filterGroup *').removeClass('selected');
	$('#allIcons').find('a').removeClass('selected').find('i').removeClass('selected');
	$('#allIcons').find('#iconsTotal').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#totals li *').removeClass('selected');
	$('#view-all').css('background', 'none').css('color', '#ccc');
	$('#view-all *').css('color', '#ccc');
	$('#view-my-picks').css('background', 'none').css('color', '#ccc');
	$('#view-my-picks *').css('color', '#ccc');
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