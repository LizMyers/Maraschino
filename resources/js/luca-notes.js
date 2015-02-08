var category = {
	nature: 0,
	entertainment: 0,

}
category.nature

var listView;

for (var i=0, i < bbSet.length(); i++){
	if(bbset[i].id === myPickID){
		listView += "<div>"+bbset[i].name+"</div>";
	}
}