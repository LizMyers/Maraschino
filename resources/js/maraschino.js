/*
MARASCHINO by Myers Design Ltd
January 2015
As is without warrenty statement goes here
*/
 		    
$(document).on('pagecreate', '#bbGrid', function(){
	 
  		// sidr menu (left = default)
  	  	$('#simple-menu').sidr({
  	  		//side: 'right',
	  		speed:100
	  	});
	  	
	  	  	
	  	var sliderIsOpen = localStorage.getItem('mSlider');
	  	if((sliderIsOpen == undefined) || (sliderIsOpen =='') || (sliderIsOpen =="closed")){
	  		sliderIsOpen == "closed";
	  	}else{
		  	sliderIsOpen == "open";
			$('#simple-menu').trigger('click');
			localStorage.setItem('mSlider', "open");
	  	}

        // init Isotope
		$('#container').isotope({
			  itemSelector: '.item',
			  layoutMode: 'fitRows',
			  getSortData: {
			  	number:'.number',
			  	title: '[data-title]',
			    name: '.name',
			    author: '.set',
			    selected: '.mypicks',
			    category: '[data-category]'
			  }
		 });
    
    
         $(window).resize(function(){
            console.log("resized window");
            $('#container').isotope('layout');
			  
         });
		 					
		//set colour of default menus to show defaults
		$('#allIcons').find('a').addClass('selected').find('i').addClass('selected');
        $('#allIcons').find('#iconsTotal').addClass('selected');
		
		var theme = localStorage.getItem('theme');
		if (theme == "steel-blue"){
			$('.menu #steel-blue').find('a').addClass('selected').find('i').addClass('selected');
		}else if(theme=="light-theme"){
			$('.menu #light-theme').find('a').addClass('selected').find('i').addClass('selected');
		}else{
			$('.menu #dark-theme').find('a').addClass('selected').find('i').addClass('selected');
		}
		
		$('#view-all').css('background', '#f46666').css('color', 'white');
        $('#view-all i').css('color', 'white');
	
				
		//load bbSet by default
		changeSet(allSets);		
			 
});//end gridView init
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#bbGrid', function(){

/////////////////////////////// INIT VARS //////////////////////////////////////

			var myCount = JSON.parse(localStorage.getItem("myCount"));

			if(myCount!==undefined && myCount !==' '){
				$('#picksTotal').text(myCount);
			}else{
				var myCount = 0;
				$('#picksTotal').text(myCount);
			}
			
	    	var $container = $('#container');
	    	var $item = $('#container .item');
	    	
	    		   		    	
/////////////////////////////// CLICK TILES ////////////////////////////////////////////
	    		   		    	
		     $item.on('click.item', function(){ 
		       
			     var $this = $(this);
			     var myCount = localStorage.getItem('myCount');
			     console.log(myCount);
			     var $myPicksArray = localStorage.getItem('myPicksArray');
			     console.log($myPicksArray);
			     
			     if (($myPicksArray)&&($myPicksArray!==undefined)&&($myPicksArray!=='')){
			     	$myPicksArray = JSON.parse(localStorage.getItem('myPicksArray')); 
			    }else{
				     var $myPicksArray=[];
			    }
			    		     
			     $this.toggleClass('mypicks');
			     
				 //remove items that were deselected
			  	var myPicksFilterStatus = $('#showMyPicks').attr('class');
     			var myPicks = $this.find('b').attr('class');
     			
			 	if((myPicks !== "faveHide") && (myPicksFilterStatus == "selected")){
				 	$('#container').isotope({ filter: '.mypicks'});
				 }
				 
				 //change star color = red/light-theme else yellow
			     var $icon = $this.find($('b'));
			     var isSelected = $('.menu #steel-blue ').find('a').attr('class');
			     
			     if(isSelected =="ui-link selected"){
				     	$icon.toggleClass('faveShow');
				 		$icon.css('color', '#fc0');
			     }else{
				     	$icon.toggleClass('faveShow');
					 	$icon.css('color', '#f46666');	
			     }
			     var $number = $this.find('.number').text();	 
			     var $name = $this.find('.name').text();
			     var $star = $this.find('b').attr('class');
				
			      //unfave = remove from array
			     if($star !== "bb-star faveShow") {  

				 	var $myDiscard = $myPicksArray.indexOf($number);
			        			        
			     	$myPicksArray.splice($myDiscard, 1);
			     	
				    localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));				  
				    myCount--;
					    if(myCount <=0){
						    localStorage.removeItem("myPicksArray");
					    }
			     }else{			 
			     	$myPicksArray.push($number);
			     	localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
			     	myCount++;			     	
				 }
				 //update myPicks count for this set
				 $('#myCount').text(myCount);
				 localStorage.setItem("myCount", myCount);	
				 
				 myCount = JSON.parse(localStorage.getItem('myCount'));
				 var picksTotal = JSON.stringify(myCount);
				 $('#picksTotal').text(picksTotal);

		  	});//end item onClick	
    
    $('#simple-menu').trigger('click');

/////////////////////////////// SEARCH ////////////////////////////////////////////
		  	
		$('#search').on('keyup', function(){
		   console.log("heard keyup");
		   $('#btnClear').css({'visibility' : 'visible'});
		  return false;
		});
		
		$('input').on("keyup", function(event) {
		    if(event.keyCode == '13'){
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
		            $('#container').isotope({ filter: '*'});
		            $('#showAll *').css('color','#fff');
                } else {
				  $('#container').isotope({ filter: ':contains('+kwd+')'});  
                  $('#setGroup').find('a').removeClass('selected').find('i').removeClass('selected');
                }
		    }
		    return false;
		});
								
		$('#clearSearch').on('click', function(){
           $('#view-all').css('background', '#f46666');
           $('#view-all').css('color', '#fff');
           $('#view-all .bb-infinity').css('color', '#fff');
           $('#totals #allIcons *').addClass('selected');
		   $('#search').val('');
		   $('#container').isotope({ filter: '*'});
		   $(this).hide();
		  return false;
		});
		  	
/////////////////////////////// TRIGGER MENUS ////////////////////////////////////////////
		 
		 //$('#simple-menu').trigger('click');
		 
		 $('#clearSearch').hide();
		 
		  //restore menu states
		 menuStates();
		 
		 //restore colour scheme
		 var theme = localStorage.getItem('theme');
		 
		 if((theme=='')){
			 theme="dark-theme";
			 changeColorScheme("dark-theme");
		 }else{
		 	 changeColorScheme(theme);
		 }				
			 	
});//end bbGrid pageshow

////////////////////////////////////////////////////////////////////////////////////
//////////////////             GLOBAL                  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function menuStates(){

		var mClr=localStorage.getItem("mClr");
		var mSet=localStorage.getItem("mSet");
		var mBrowse=localStorage.getItem("mBrowse");

		if((!mClr) || (mClr =='') || (mClr == "open")){
			$('#colorToggle').trigger('click');
		}
		
		if((!mSet) || (mSet =='') || (mSet == "open")){
			$('#setToggle').trigger('click');
		}
		
		if((!mBrowse) || (mBrowse =='') || (mBrowse == "open")){
			$('#browseToggle').trigger('click');
		}
				
}//function menu states

//slider-menu

$('#simple-menu').on('click', function(){	

	var sliderIsOpen = localStorage.getItem('mSlider');
	console.log("sliderIsOpen= "+sliderIsOpen);
	
	if(sliderIsOpen =="open"){
		localStorage.setItem('mSlider', "closed");
	}else if(sliderIsOpen == "closed") {
		localStorage.setItem('mSlider', "open");
	}			 
});

//////////////////////////// TOGGLE MENUS /////////////////////////////////	

$('#colorGroup').hide();	
$('#colorToggle').on('click', function(){	
$('#colorToggle i').toggleClass('fa-rotate-270');	
$('#colorGroup').slideToggle('fast');	
	if($('#colorToggle i').hasClass('fa-rotate-270')){
		localStorage.setItem('mClr', "open");
	}else{
		localStorage.setItem('mClr', "closed");
	}		     
});
$('#setGroup').hide();	
$('#setToggle').on('click', function(){	
$('#setToggle i').toggleClass('fa-rotate-270');	
$('#setGroup').slideToggle('fast');	
	if($('#setToggle i').hasClass('fa-rotate-270')){
		localStorage.setItem('mSet', "open");
	}else{
		localStorage.setItem('mSet', "closed");
	}		     
});
$('#filterGroup').hide();	
$('#browseToggle').on('click', function(){
$('#browseToggle i').toggleClass('fa-rotate-270');	
$('#filterGroup').slideToggle('fast');			
	if($('#browseToggle i').hasClass('fa-rotate-270')){
		localStorage.setItem('mBrowse', "open");

	}else{
		localStorage.setItem('mBrowse', "closed");

	}
});
 	 
/////////////////////// CHANGE SET ////////////////////////////////////		
				 
function changeSet(set){
		//init category totals
		var nBusiness=0;
		var nEntertainment=0;
		var nFood=0;
		var nNature=0;
		var nObjects=0;
		var nOffice=0;
		var nPeople=0;
		var nSocial=0;
		var nTravel=0;
		var nSports=0;
		var nTechnology=0;
		var nUI=0;
			
        var icon='';
        var i=0;
        var nBbSet=0;
        var nFaSet=0;
        var nGlSet=0;
            
        var icons = $.map(set, function(icon, i){
            var id = i+1;
            var name = icon.name;
            var code = icon.symbol;
            var category = icon.category;
            var set = icon.set;
            var keywords = icon.keywords;
          
            switch(set) {
                    case "bb10":
                      nBbSet++;
                      //console.log("bb10: "+nBbSet)
                    break;
                    case "font-awesome":
                      //console.log("font-awesome: "+nFaSet);
                      nFaSet++;
                    break;
                    case "glyphicons":
                      //console.log("glyphicons: "+nGlSet);
                      nGlSet++;
                    break;
            }
     	
        	switch(category){
	        	case "business":
	        		nBusiness++;
	        		$("#nBusiness").text(nBusiness);
	        	break;
	        	case "entertainment":
	        		nEntertainment++;
	        		$("#nEntertainment").text(nEntertainment);
	        	break;
				case "food":
	        		nFood++;
	        		$("#nFood").text(nFood);
	        	break;
	        	case "nature":
	        		nNature++;
	        		$("#nNature").text(nNature);
	        	break;
				case "objects":
	        		nObjects++;
	        		$("#nObjects").text(nObjects);
	        	break;
	        	case "office":
	        		nOffice++;
	        		$("#nOffice").text(nOffice);
	        	break;
				case "people":
	        		nPeople++;
	        		$("#nPeople").text(nPeople);
	        	break;
	        	case "social":
	        		nSocial++;
	        		$("#nSocial").text(nSocial);
	        	break;
	        	case "travel":
	        		nTravel++;
	        		$("#nTravel").text(nTravel);
	        	break;
	        	case "sports":
	        		nSports++;
	        		$("#nSports").text(nSports);
	        	break;
				case "technology":
	        		nTechnology++;
	        		$("#nTechnology").text(nTechnology);
	        	break;
	        	case "UI":
	        		nUI++;
	        		$("#nUI").text(nUI);
	        	break; 
        	}
            if (code.substr(0, 2)=="fa") {
        		var author = icon.set;
	        	var symbol = "fa "+icon.symbol;  //font-awesome classes require fa-prefix
	        	var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	        	var index = $.inArray(JSON.stringify(i+1), myPicksArray);
	        	var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";
			        if (isMyPick == "mypicks") {
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        					'<p class="keywords">'+keywords+'</p>'+
			        					'</div>';
					} else {						
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        					'<p class="keywords">'+keywords+'</p>'+
			        					'</div>';
			        }//end if isMyPick
		    } else if (code.substr(0, 2)=="bb") {
		    	var author = icon.set;
	        	var symbol = icon.symbol;
	        	var keywords = icon.keywords;
	        	var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	        	var index = $.inArray(JSON.stringify(i+1), myPicksArray);
	        	var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";	        	
			        if (isMyPick == "mypicks") {
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        					'<p class="keywords">'+keywords+'</p>'+
			        					'</div>';									
					} else {						
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        				    '<p class="keywords">'+keywords+'</p>'+
			        					'</div>';
			        }//end if isMyPick
                } else if (code.substr(0, 2)=="gl") {
		    	var author = icon.set;
	        	var symbol = icon.symbol;
	        	var keywords = icon.keywords;
	        	var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	        	var index = $.inArray(JSON.stringify(i+1), myPicksArray);
	        	var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";	        	
			        if (isMyPick == "mypicks") {
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        					'<p class="keywords">'+keywords+'</p>'+
			        					'</div>';									
					} else {						
						var item = '<div class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
										'<div class="faveHide"><b class="bb-star"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="set">'+author+'</p>'+
			        				    '<p class="keywords">'+keywords+'</p>'+
			        					'</div>';
			        }//end if isMyPick
        	}//end if glyphicons
					            				        								 
				$(item).appendTo('#container');			
            
            //UPDATE COUNT TOTALS
            $('#nBbSet').text(nBbSet);
            $('#nFaSet').text(nFaSet);
            $('#nGlSet').text(nGlSet);
            $('#iconsTotal').text(i+1);
            
				       	        	      				       
        });//map function
        
			 return icons;	
			  
	};//end changeSet function
	
/////////////////////// SWIPE OPEN/CLOSE  /////////////////////////////			

	$('#container').on('swiperight', function(){
			$.sidr('open', 'sidr');
		preventDefaultEvents:false;
	});
	
	$('#container').on('swipeleft', function(){
			$.sidr('close', 'sidr');
		preventDefaultEvents:false;
	});
	
	 
//////////////////////////// FILTERS /////////////////////////////////////	

	$('.showMyPicks').on('click', function(){
		 $('#allIcons *').removeClass('selected');
         $('#myPicks *').addClass('selected');
	 	 $('#container').isotope({ filter: '.mypicks'});
	 	 $('.showAll').css('color', '#fff').find('i').css('color', '#fff');
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

	  $('.showAll').on('click', function(){
         $('#allIcons *').addClass('selected');
         $('#myPicks *').removeClass('selected');
	  	 $('#container').isotope({ filter: '*'});
	 	 $('#clearSearch').hide();
	 	 $('#search').val('');
	 	 $('#filterGroup li *').removeClass('selected');
         $('#setGroup li *').removeClass('selected');
         $('#btnClearLibraries').css('color', '#555');
         $('#btnClearCategories').css('color', '#555');
         $('#view-my-picks').css('background', 'none').css('color', '#ccc');
         $('#view-all i').css('color', '#ccc');
         $('#view-all i').css('color', '#fff');
         $('#view-all').css('background', '#f64444').css('color', '#fff');
	  });
	  
	  function clearAllMyPicks(){
	  	 var myCount = 0;
	  	 $('#btnCancel').trigger('click'); 
		 localStorage.removeItem("myCount");
	 	 localStorage.removeItem("myPicksArray");
	 	 $('#showMyPicks *').removeClass('selected');
         $('#allIcons').css({'color' : '#f46666'});
         $('#myPicks').css({'color' : '#999'});
		 $('#container *').find('b').removeClass('faveShow');
		 $('#container *').removeClass('mypicks');
		 localStorage.setItem("myCount", myCount);
		 $('#picksTotal').text("0");
		 $('#container').isotope({ filter: '*'});
         $('#view-all').css('background', '#f46666').css('color', '#fff');
         $('#view-all *').css('color', '#fff');
         $('#view-my-picks').css('background', 'none').css('color', '#ccc');
         $('#totals li *').removeClass('selected');
         $('#allIcons *').addClass('selected');
         $('#btnClearCategories').trigger('click');
         $('#btnClearLibraries').trigger('click');
	  }
	 
	 $('#filterGroup > li').on('click', this, function(){
	 	 var catSelector = $(this).attr('data-category-value');
	 	 if(catSelector =="*"){
		 	 $('#showAll *').css('color', '#fff');
	 	 }else{
		 	 $('#showAll *').css('color', '#999');
             $('#btnClearCategories').css('color', '#fc6');
	 	 }
	 	 $('#container').isotope({ filter: catSelector});
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
	 });

    $('#btnClearCategories').on('click', function(){
        $('#container').isotope({ filter: '*'});
        $('#filterGroup *').removeClass('selected');
        $('#allIcons *').addClass('selected');
        $('#view-all').css('background', '#f46666').css('color', '#fff');
        $('#view-all *').css('color', '#fff');
        $(this).css('color', '#666');
    });

    $('#download').on('click', function(){
       alert("Temporarily disabled");
    });

    $('#print').on('click', function(){
       window.location = "http://maraschino.lizmyers.webfactional.com/picksList.html";
        //window.location = "http://localhost:8000/picksList.html";
    });
 	 
///////////////////////// SELECT LIBRARY /////////////////////////////////		
	
	$('#bbSet').on('click', function(){
        var mySet = "bb10";
        $('#container').isotope({ filter: ':contains('+mySet+')'});
        $(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	 	$(this).find('a').addClass('selected').find('i').addClass('selected');
        $(this).siblings().find('.countTxt').removeClass('selected');
        $(this).find('.countTxt').addClass('selected');
        $('#btnClearLibraries').css('color', '#fc6');
        $('#filterGroup li *').removeClass('selected');
        $('#totals li *').removeClass('selected');
        $('#clearSearch').hide();
        $('#search').val('');
        $('#totals li *').removeClass('selected');
        $('#view-all').css('background', 'none').css('color', '#ccc');
        $('#view-all *').css('color', '#ccc');
        $('#view-my-picks').css('background', 'none').css('color', '#ccc');
        $('#view-my-picks *').css('color', '#ccc');
	});

	$('#faSet').on('click', function(){
        var mySet = "font-awesome";
        $('#container').isotope({ filter: ':contains('+mySet+')'});
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
	});

	$('#glyphSet').on('click', function(){
        var mySet = "glyphicons";
        $('#container').isotope({ filter: ':contains('+mySet+')'});
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
	});

    $('#btnClearLibraries').on('click', function(){
        $('#container').isotope({ filter: '*'});
        $('#setGroup *').removeClass('selected');
        $('#allIcons').find('a').addClass('selected').find('i').addClass('selected');
        $('#allIcons').find('#iconsTotal').addClass('selected');
        $(this).css('color', '#555');
        $('#view-all').css('background', '#f46666').css('color', '#fff');
        $('#view-all *').css('color', '#fff');
        $('#view-my-picks').css('background', 'none').css('color', '#ccc');
        $('#view-my-picks *').css('color', '#ccc');
    });
	
///////////////////////// CHANGE COLOURS /////////////////////////////////	

$('#light-theme').on('click', function(){	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	 	$(this).find('a').addClass('selected').find('i').addClass('selected');
        $('#container .item').find('b').css('color', '#f46666'); 
	 	localStorage.setItem('theme', "light-theme");
	 	changeColorScheme("light-theme");
});

$('#steel-blue').on('click', function(){	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	 	$(this).find('a').addClass('selected').find('i').addClass('selected');
        $('#container .item').find('b').css('color', '#edb110'); 
	 	localStorage.setItem('theme', "steel-blue");
	 	changeColorScheme("steel-blue");
	 
});

$('#dark-theme').on('click', function(){	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	 	$(this).find('a').addClass('selected').find('i').addClass('selected');
        $('#container .item').find('b').css('color', '#f46666'); 
	 	localStorage.setItem('theme', "dark-theme");
	 	changeColorScheme("dark-theme");
});
	 				
function changeColorScheme(theme){

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
			$('#navbar1').css('border-bottom', '2px dotted #565656');	
			$('#myCount').css('color', '#f46666');	
			$('#myCount').css('color', '#f46666');	
				
	switch(theme){
		
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
			$('#navbar1').css('border-bottom', '2px dotted #ccc');
			$('#myCount').css('color', '#fff');	
			$('div#showAll > i.bb-infinity').css('color', '#fff');
			$('#btnEraser').css('color', '#fff');
			$('#sliderMenu').css('color', '#fff');
		break;
		
		case "steel-blue":
			$('#container').addClass('steelblue-container');
			$('#container .item').addClass('steelblue-item');
			$('#container .item .faveShow').removeClass('lt-fave');  
			$('#container .item .faveShow').css('color', '#edb110');		
			$('#navbar1').css('border-bottom', '2px dotted #565656');	
			$('#myCount').css('color', '#f46666');	
			$('#search').css('border-color', '#666');	
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
			$('#navbar1').css('border-bottom', '2px dotted #565656');	
			$('#search').css('border-color', '#666');	
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
			$('#navbar1').css('border-bottom', '2px dotted #565656');	
		break;		
	}//end switch	
}//end colour change function

