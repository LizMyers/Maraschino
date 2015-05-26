/**********************************************************
 
CreateArtboardsLayers.jsx

DESCRIPTION

The script takes your active document and creates one
artboard per layer. This is useful when you share your
work on the Creative Cloud, as it will create one page
per layer. More information on my blog:
www.creativedroplets.com

There is no copyright, have fun with it.
I'm Michael Chaize - @mchaize on twitter
Check my blog: www.CreativeDroplets.com
 
**********************************************************/


    if ( app.documents.length > 0 ) {
                
        doc = app.activeDocument;
        
        if(!doc.saved){
            Window.alert("This script needs to modify your document. Please save it before running this script.");
        }
    
    }else{
        Window.alert("You must open at least one document.");
    }

    
// This function creates one Artboard per visible layer
// It's a great way to showcase your work in the Adobe Creative Cloud
function createArtboardPerLayer(doc){

    //get the total number of layers in the active document
    var totalLayers = doc.layers.length;
    
    //looping on layers to create one artboard per layer
    for ( var i = 0 ; i < totalLayers ; i++){
            
        var currentLayer = doc.layers[i];
        
        var tempItem;
                
        //We don't want to deal with hidden layers
        if(currentLayer.visible == false) continue;
                
        //Unlock the layer if needed
        currentLayer.locked = false;
                
        //Select ALL in the layer
        currentLayer.hasSelectedArtwork = true;
    
        //Create a new artboard based on the dimension of the document
        var artboard = doc.artboards[0];
        var ABrect = artboard.artboardRect;
        
        if(doc.visibleBounds[2] == 0) {
            // ignore empty layers ** Tricks by David Deraedt
            continue;
        } 

        var newAB = doc.artboards.add(ABrect);
        var indexAB = doc.artboards.getActiveArtboardIndex();
        doc.fitArtboardToSelectedArt(indexAB);
        doc.selection = null;
    }
}

createArtboardPerLayer(doc);