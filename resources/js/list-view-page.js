
		    
$('#listView').on('pageshow', function(){

		$('#btnGridView').on('click', function(){
  		$.mobile.changePage('#gridView');
  		console.log("clicked grid view");
		});
			
			var mySet = faSetPlus;
			var icon='';
			var icons = $.map(mySet, function(icon, i){
				var code = icon.symbol;
				var name = icon.name;

        	var listItem ='<li><i class="fa '+code+'"fw" ></i> <span class="label">'+name+' ('+code+')</span></div></li>';
			$(listItem).appendTo('#list');
        	
    					       
    });//map function
    
		 return icons;	 
	
});//page init
        				

