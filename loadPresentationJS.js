
jQuery(document).ready(function() {
    loadPresentationScripts();
});

let totalScripts = 0;
let loadedScripts = 0;
let requiredScripts = 6;

// load script function
function loadScript(number, url)
{
    if(totalScripts<6){
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

let scriptURL = 'https://cdn.jsdelivr.net/gh/nadrojmit/shared-js-files@v1.21/';
let JStoLoad = {
    1: scriptURL+'rootAPI.js',
    2: scriptURL+'reveals.js',
    3: scriptURL+'audio.js',
    4: scriptURL+'progress.js',
    5: scriptURL+'initialisePresentation.js',
    6: scriptURL+"navigation.js"
}

function loadPresentationScripts() {
    loadScript(0,scriptURL+"navigation.js");

}