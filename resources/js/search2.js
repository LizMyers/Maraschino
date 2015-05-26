var t = null;
  $("#search").keyup(function(){
        if (t) {
           clearTimeout(t);
        }
        t = setTimeout(search, 500); // give the user time to write stuff 
  });
 
  function search(){
    var q = $("#search").val().toLowerCase();
  
    if (q.length == 0) {
      //alert("q length is zero. Q = " + q );
       $('#container').isotope( {filter : '*'} ); // show all
    } else {
      
      var tokens = q.toLowerCase().split(' '),
          itemsToShow = $(' .name'); // start with all
 
      for (var i = tokens.length - 1; i >= 0; i--) {
        if(tokens[i].length == 0) {
        	alert("tokens[i].length == 0");
        	continue;
        }
        
        itemsToShow = itemsToShow.filter(function(index){
              var $this = $(this);
              text = $this.text().toLowerCase();
              var score = text.score(tokens[i]);
              return score > 0 ? true : false;
        });
      }
 
      $('#container').isotope( {filter : itemsToShow } );
    }
  }