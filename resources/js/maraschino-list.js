$(document).on('pagecreate', function() {

	//time date stamp
	var now = dateFormat(new Date(), "dddd, mmm dS, yyyy, h:MM:ss TT");
	// Saturday, June 9th, 2007, 5:46:21 PM
	$('#date').append(now);

	var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	//list layout
	var allSets=JSON.parse(localStorage.getItem('allSets'));
	var icons = $.map(allSets, function(icon, i) {

		var id = i + 1;
		var name = icon.name;
		var code = icon.symbol;
		var category = icon.category;
		var author = icon.set;
		var symbol = icon.symbol;

		var index = $.inArray(JSON.stringify(i + 1), myPicksArray);
		
		var isMyPick = ((index !== -1) && ((i + 1) == myPicksArray[index])) ? "mypicks" : "";
		if (isMyPick == "mypicks") {
			//console.log(code);

		var item = '<li data-sort='+name+'>' +
			'<p class = "glyph"><i class="' + symbol + '"></i></p>' +
			 '<p class="name">' + ' ' + id + '. ' + name + '<br>' +
			'<span class="code">' + code + '</span></p>' +
			'</li>';
		}
	
		$(item).appendTo('#pList');
			
		return icons;

	}); //map function


}); //pageCreate

$(document).on('pagebeforeshow', function() {

	var myCount = JSON.parse(localStorage.getItem('myCount'));
	console.log("myCount: "+myCount);
	if (myCount <= 0) {
		$('#pList').hide();
		$('#msg').show();
		console.log("show msg");
	} else {
		$('#msg').hide();
		console.log("hide msg");
		$('pList').show();
		$('#pList').css('top', '100px');
		//sort list alphabetically by name
		var mylist = $('#pList');
		var listitems = mylist.children('li').get();
		listitems.sort(function(a, b) {
		   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
		})
		$.each(listitems, function(idx, itm) { mylist.append(itm); });
	}


}); //pageBeforeShow



///////////////////////////////////////////////////////////////////////////////////