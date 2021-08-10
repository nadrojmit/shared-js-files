loadedScripts++;
// root container functions

function completeActivity()  {
    console.log('complete fires');
    parent.postMessage("complete","*");  
}

function closeLightbox() {
    parent.postMessage("close","*"); 
}
