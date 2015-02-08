/*
MARASCHINO by Myers Design Ltd
January 2014
As is without warrenty statement goes here
*/
 		    
$(document).on('pagecreate',  function(){
		
		//time date stamp
		var now = dateFormat(new Date(), "dddd, mmm dS, yyyy, h:MM:ss TT");
		     // Saturday, June 9th, 2007, 5:46:21 PM
		$('#date').append(now);
					 
		//list layout
		var icons = $.map(allSets, function(icon, i){
			
			var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));

			if(myPicksArray != null) {
			  	$('#msg').hide();	
                $('#pList').css('top', '100px');
			} 
								
        	var id = i+1;
        	var number = icon.number;
        	var name = icon.name;
        	var code = icon.symbol;
        	var category = icon.category;
			var author = icon.set;
	        var symbol = icon.symbol;
	        //var keywords = icon.keywords;
	        
	        	var index = $.inArray(JSON.stringify(i+1), myPicksArray);
	        	var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";	       	
			        if (isMyPick == "mypicks") {
                         console.log(code);
                        
                        if (code.substr(0,2)=="fa") {
                            
                            var item = '<li>'+		
			        					'<p class ="glyph"><i class="fa '+symbol+'"></i></p>'+        		
			        					'<p class="name">'+' '+name+'<br>'+
			        					'<span class="code">'+'fa '+code+'</span></p>'+
			        					'</li>';	
					     } else {
                        
                             var item = '<li>'+		
			        					'<p class = "glyph"><i class="'+symbol+'"></i></p>'+        		
			        					'<p class="name">'+' '+name+'<br>'+
			        					'<span class="code">'+code+'</span></p>'+
			        					'</li>';									
					}
                }
	        								 
				$(item).appendTo('#pList');		
				
				return icons;		
				       	        	      				       
        });//map function
			
			 
});//end gridView init
///////////////////////////////////////////////////////////////////////////////////