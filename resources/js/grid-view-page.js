/*
FONTOLOGY by Myers Design Ltd
January 2014
As is without warrenty statement goes here
*/
 		    
  $('#gridView').on('pageinit', function(){
  
  	  	$('#simple-menu').sidr({
  	  		//side: 'right',
	  		speed:100
	  	});

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

		/*SORTS DROP-DOWN--------------------------------------------------------------*/
		$('#mSort').change(function(){
		  var sorter = $(this).find('option:selected').attr('data-sort-value');
		  console.log("sorting on: "+sorter);
		  if (sorter == "z-a"){
		  	$('#container').isotope({ sortBy: 'name', sortAscending: false });
		  }else if(sorter == "10-1"){
		  	$('#container').isotope({ sortBy: 'number', sortAscending: false });
		  }else if(sorter == "a-z"){
		  	$('#container').isotope({ sortBy: 'name', sortAscending: true});
		  }else if(sorter == "1-10"){
			$('#container').isotope({ sortBy: 'number', sortAscending: true});
		  }		
		 });
		
		/*FILTERS DROP-DOWN--------------------------------------------------------------*/
		$('#mCategory').change(function(){
		  var catSelector = $(this).find('option:selected').attr('data-category-value');
		  $('#container').isotope({ filter: catSelector});
		  
		   //clear keywords filter
		   $('#search').val('');
		   $('#btnClear').css({'visibility' : 'hidden'});
		 
		});
		
		$('#btnSearch').on('click', function(){
		  var kwd = $('#search').val();
		  console.log("Your criteria = "+kwd);
		  $('#container').isotope({ filter: ':contains('+kwd+')'});
		  return false;
		});
		
		$('#search').on('keyup', function(){
		   console.log("heard keyup");
		   $('#btnClear').css({'visibility' : 'visible'});
		  return false;
		});
		
		$('#search').on("keyup", function(event) {
		    if(event.keyCode == '13'){
		    	   console.log("heard return key -thanks!");
				  var kwd = $('#search').val();
				  console.log("Your criteria = "+kwd);
				  $('#container').isotope({ filter: ':contains('+kwd+')'});  
		    }
		    return false;
		});
		
		$('#btnClear').on('click', function(){
		   $('#search').val('');
		   $('#container').isotope({ filter: '*'});
		   $(this).css({ 'visibility' : 'hidden'});
		   //return filter dropdown to all categories
		   $('#mCategory').prop("selectedIndex", 1);
		  return false;
		});
		
		/*COLOURS DROP-DOWN--------------------------------------------------------------*/		
		$('#mPrefs').change(function(){
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
			$('#container .item .faveShow').css('color', '#fc0'); 
		 
		  var clrSelector = $(this).find('option:selected').attr('data-clr-value');
	
		  if(clrSelector == "light-theme"){//light-theme 
		    $('#gridView').css('background', 'whitesmoke');
		  	$('.ui-content').css('background', 'whitesmoke');
			$('#container').addClass('lt-container');
			$('#container .item').addClass('lt-item');
			$('.glyph i').addClass('lt-txt-glyph');
			$('#container .item .number').addClass('lt-txt-bold30');
			$('#container .item .name').addClass('lt-txt-bold30');
			$('#container .item .code').addClass('lt-txt');
			$('#container .item .faveShow').addClass('lt-fave');
		  }else if(clrSelector == "steel-blue"){//steelblue
		  	$('#container').addClass('steelblue-container');
			$('#container .item').addClass('steelblue-item');
			$('#container .item .faveShow').removeClass('lt-fave');  
			$('#container .item .faveShow').css('color', '#fc0');
		  }else if(clrSelector == "default"){//default-theme 
		    $('#container').removeClass('lt-container').removeClass('steelblue-container');
			$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
			$('.glyph i').removeClass('lt-txt-glyph');
			$('#container .item .number').removeClass('lt-txt-bold30');
			$('#container .item .name').removeClass('lt-txt-bold-30');
			$('#container .item .code').removeClass('lt-txt');
			$('#container .item .faveShow').removeClass('lt-fave'); 
			$('#container .item .faveShow').css('color', '#fc0'); 
		 }
		});
		
		/*SET DROP-DOWN--------------------------------------------------------------*/		
				 
		$('#mSets').change(function(){
		
		 var setSelector = $(this).find('option:selected').attr('data-set-value');
		
			$('#container').empty();
			
			if(setSelector == "bb10"){

			   	var mySet = bb10Set;
				var icon='';
				var icons = $.map(mySet, function(icon, i){
				var number = i;
        	    var name = icon.name;
	        	var code = icon.symbol;
	        	var category = icon.category;
	        	var author = icon.set;
	        	var keywords = icon.keywords;
	        	var symbol = icon.symbol;

		        	    var items = '<div class="item '+category+'"id='+i+' "data-title="'+name+'"data-category="'+category+'">'+
										'<div class="faveHide"><b class="bb-star"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="author">'+author+'</p>'+
			        					'<p class="keywords">'+keywords+'</p>'+
			        					'</div>';
					 
							$(items).appendTo('#container');
		        	        	      				       
		        });//map function
		        
					 return icons;	
					 	
			}else{//font-awesome

			$('#container').empty();
			
				var mySet = faSet;
				var icon='';
				var icons = $.map(mySet, function(icon, i){
				var number = i;
        	    var name = icon.name;
	        	var code = icon.symbol;
	        	var category = icon.category;
	        	var author = icon.author;
	        	//var keywords = icon.keywords;
			    var symbol = "fa "+icon.symbol;//font-awesome classes require fa-prefix
	
		        	    var items = '<div class="item '+category+'"id='+i+' "data-title="'+name+'"data-category="'+category+'">'+
										'<div class="faveHide"><b class="fa-star"></b></div>'+
			        					'<p class="number">'+(i+1)+'</p>'+
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
			        					'<p class="name">'+name+'</p>'+
			        					'<p class="code">'+code+'</p>'+
			        					'<p class="author">'+author+'</p>'+
			        					/* '<p class="keywords">'+keywords+'</p>'+ */
			        					'</div>';
					 
							$(items).appendTo('#container');
		        	        	      				       
		        });//map function
		        
					 return icons;		
		
			}	//end conditional statement	
		});//end set selector change function
				 		   	 											
		var mySet = bb10Set;
        var icon='';
        var icons = $.map(mySet, function(icon, i){
        	var number = i;
        	var name = icon.name;
        	var code = icon.symbol;
        	var category = icon.category;
        	
        	if(author = "font-awesome"){
        		var author = icon.author;
	        	var symbol = "fa "+icon.symbol;//font-awesome classes require fa-prefix
		    }else{
		    	var author = icon.set;
	        	var symbol = icon.symbol;
	        	var keywords = icon.keywords;
        	}
        	    var items = '<div class="item '+category+'"id='+i+' "data-title="'+name+'"data-category="'+category+'">'+
								'<div class="faveHide"><b class="bb-star"></b></div>'+
	        					'<p class="number">'+(i+1)+'</p>'+
	        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+
	        					'<p class="name">'+name+'</p>'+
	        					'<p class="code">'+code+'</p>'+
	        					'<p class="author">'+author+'</p>'+
	        					/* '<p class="keywords">'+keywords+'</p>'+ */
	        					'</div>';
			 
					$(items).appendTo('#container');
        	        	      				       
        });//map function
        
			 return icons;		
			 

	});//page init
	
	
	$(document).on('pageshow', function(){
		
	    	var $container = $('#container');
	    	var $item = $('#container .item');
	    	 			   		    	
		       $item.on('click.item', function(){ 
			     var $this = $(this);
			     
			     $this.toggleClass('mypicks');
			     var $icon = $this.find($('b'));
			     var clrScheme = $('#mPrefs').find('option:selected').attr('data-clr-value');
			     //console.log("Color scheme "+clrScheme);
				 	if(clrScheme == 'light-theme'){
				 		console.log("Color scheme "+clrScheme);
				 		$icon.toggleClass('faveShow');
				 		$icon.css('color', '#c00');
				 	}else{
					 	$icon.toggleClass('faveShow');
					 	$icon.css('color', '#fc0');			 
				 	}
				 //check and see if "myPicks" filter is on
				 var myPicks = $('#mCategory').find('option:selected').attr('data-category-value');
				 if(myPicks == '.mypicks'){
				 	$('#container').isotope({ filter: '.mypicks'});
				 }
				 var clrScheme = $('#mPrefs').find('option:selected').attr('data-clr-value');
			     var $number = $this.find('.number').text();	 
			     var $name = $this.find('.name').text();
			     var $code = $this.find('.code').text();		
			     console.log($number, $name);   
			     //var $favesArray = [];
			     //$favesArray.push({"name": $name, "code" : $code});		
			   	 // localStorage.setItem($number, JSON.stringify($favesArray));	
 
		  	});//end item onClick	
		 
		 	//$('#simple-menu').trigger('click'); 	
					  							 	
	});//pageshow
	
//btn event listeners
	$('#light-theme').on('click', function(){
		changeColorScheme("light-theme")
	});
	$('#steel-blue').on('click', function(){
		changeColorScheme("steel-blue")
	});
	$('#dark-theme').on('click', function(){
		changeColorScheme("dark-theme")
	});
	
//functions   				
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
			$('#container .item .faveShow').css('color', '#fc0'); 
	
	switch(theme){
		
		case "light-theme":
			$('#gridView').css('background', 'whitesmoke');
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
			$('#container .item .faveShow').css('color', '#fc0');		
		break;
		
		case "dark-theme":
		 	$('#container').removeClass('lt-container').removeClass('steelblue-container');
			$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
			$('.glyph i').removeClass('lt-txt-glyph');
			$('#container .item .number').removeClass('lt-txt-bold30');
			$('#container .item .name').removeClass('lt-txt-bold-30');
			$('#container .item .code').removeClass('lt-txt');
			$('#container .item .faveShow').removeClass('lt-fave'); 
			$('#container .item .faveShow').css('color', '#fc0'); 		
		break;
		
		default: 
			$('#container').removeClass('lt-container').removeClass('steelblue-container');
			$('#container .item').removeClass('lt-item').removeClass('steelblue-item');
			$('.glyph i').removeClass('lt-txt-glyph');
			$('#container .item .number').removeClass('lt-txt-bold30');
			$('#container .item .name').removeClass('lt-txt-bold-30');
			$('#container .item .code').removeClass('lt-txt');
			$('#container .item .faveShow').removeClass('lt-fave'); 
			$('#container .item .faveShow').css('color', '#fc0'); 		
		break;
		
		
	}
	
	
}
