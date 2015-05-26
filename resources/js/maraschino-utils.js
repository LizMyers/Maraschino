var Utils = {
    
    displayIcons: function(allSets) {
            
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
        var nIoSet=0;
       
        var icons = $.map(allSets, function(icon, i) {
            
                var id = i+1;
                var name = icon.name;
                var code = icon.symbol;
                var category = icon.category;
                var set = icon.set;
                var keywords = icon.keywords;

                switch(set) {
                        case "bbSet":
                          nBbSet++;
                         //console.log("bb10: "+nBbSet)
                        break;
                        case "faSet":
                         //console.log("font-awesome: "+nFaSet);
                          nFaSet++;
                        break;
                        case "glyphSet":
                          //console.log("glyphicons: "+nGlSet);
                          nGlSet++;
                        break;
                        case "ionicSet":
                          //console.log("ionic: "+nIoSet);
                          nIoSet++;
                        break;
                }

                switch(category){
                    case "business":
                        nBusiness++;
                        $("#nBusiness").text(nBusiness);
                        //console.log("Business: "+nBusiness);
                    break;
                    case "entertainment":
                        nEntertainment++;
                        $("#nEntertainment").text(nEntertainment);
                       //console.log("Entertainment: "+nEntertainment);
                    break;
                    case "food":
                        nFood++;
                        $("#nFood").text(nFood);
                        //console.log("Food: "+nFood);
                    break;
                    case "nature":
                        nNature++;
                        $("#nNature").text(nNature);
                        //console.log("Nature: "+nNature);
                    break;
                    case "objects":
                        nObjects++;
                        $("#nObjects").text(nObjects);
                        //console.log("Objects: "+nObjects);
                    break;
                    case "office":
                        nOffice++;
                        $("#nOffice").text(nOffice);
                        //console.log("Office: "+nOffice);
                    break;
                    case "people":
                        nPeople++;
                        $("#nPeople").text(nPeople);
                        //console.log("People: "+nPeople);
                    break;
                    case "social":
                        nSocial++;
                        $("#nSocial").text(nSocial);
                        //console.log("Social: "+nSocial);
                    break;
                    case "travel":
                        nTravel++;
                        $("#nTravel").text(nTravel);
                        //console.log("Travek: "+nTravel);
                    break;
                    case "sports":
                        nSports++;
                        $("#nSports").text(nSports);
                        //console.log("Sports: "+nSports);
                    break;
                    case "technology":
                        nTechnology++;
                        $("#nTechnology").text(nTechnology);
                        //console.log("Technology: "+nTechnology);
                    break;
                    case "UI":
                        nUI++;
                        $("#nUI").text(nUI);
                        //console.log("UI: "+nUI);
                    break; 
                }
                if (code.substr(0, 2)=="fa") {
                    var author = icon.set;
                    var symbol = "fa "+icon.symbol;  //font-awesome classes require fa-prefix
                    var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
                    var index = $.inArray(JSON.stringify(i+1), myPicksArray);
                    var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";
                        if (isMyPick == "mypicks") {
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code" title="hi Liz">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        } else {						
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
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
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';									
                        } else {						
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
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
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';									
                        } else {						
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="bb-star"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        }//end if isMyPick
                    } else if (code.substr(0, 2)=="io") {
                    var author = icon.set;
                    var symbol = icon.symbol;
                    var keywords = icon.keywords;
                    var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
                    var index = $.inArray(JSON.stringify(i+1), myPicksArray);
                    var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";             
                        if (isMyPick == "mypicks") {
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'"title="'+code+'">'+
                                            '<div class="faveHide"><b class="bb-star faveShow"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';                                   
                        } else {                        
                            var item = '<div data-title="'+symbol+'"class="hvr-sweep-to-top item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="bb-star"></b></div>'+
                                            '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="name">'+name+'</p>'+
                                            '<p class="code">'+code+'</p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        }//end if isMyPick
                }//end if ionicons

                //UPDATE COUNT TOTALS
                $('#nBbSet').text(nBbSet);
                $('#nFaSet').text(nFaSet);
                $('#nGlSet').text(nGlSet);
                $('#nIoSet').text(nIoSet);
                $('#iconsTotal').text(i+1);
                
                $('#container').append(item);
                
            return item;
            
        });//map function
        	  
	}//end displayIcons function

} //end Utils