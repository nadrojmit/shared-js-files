
jQuery(document).ready(function() {
    loadPresentationScripts();
});

let totalScripts = 0;
let loadedScripts = 0;
let requiredScripts = 7;

// load script function
function loadScript(number, url)
{
    if(totalScripts<7){
    // Adding the script tag to the head as suggested before
    totalScripts++;
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    number++;
    url = JStoLoad[number];
    console.log("loadScript: Total scripts is: "+totalScripts+" and current script is: "+url);
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = loadScript(number, url);
    script.onload = loadScript(number, url);

    // Fire the loading
    head.appendChild(script);
    
    }
}

let JStoLoad = {
   
    1: '../../js/core/presentation/rootAPI.js',
    2: '../../js/core/presentation/reveals.js',
    3: '../../js/core/presentation/audio.js',
    4: '../../js/core/presentation/progress.js',
    5: '../../js/core/presentation/loading-bar/loading-bar.min.js',
    6: '../../js/core/presentation/initialisePresentation.js',
    7: "../../js/core/presentation/navigation.js"
}

function loadPresentationScripts() {
    loadScript(0,"../../js/core/presentation/navigation.js");
    /*jQuery.each(JStoLoad, function(i, val) {
        loadScript(i,val);    
    });
    /*console.log("loadPresentationScripts: Function called");
    loadScript('../../js/core/presentation/navigation.js');
    loadScript('../../js/core/presentation/reveals.js');
    loadScript('../../js/core/presentation/audio.js');
    loadScript('../../js/core/presentation/rootAPI.js');
    loadScript('../../js/core/presentation/progress.js');
    loadScript('../../js/core/presentation/loading-bar/loading-bar.min.js');
    loadScript('../../js/core/presentation/initialisePresentation.js');
    console.log("loadPresentationScripts: Core scripts loaded");*/
}