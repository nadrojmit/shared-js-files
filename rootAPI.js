loadedScripts++;
// root container functions

function completeActivity()  {
    console.log('complete fires');
    parent.postMessage("complete","*");  
}

function closeLightbox() {
    parent.postMessage("close","*"); 
}

function setAudioPreference() {
    parent.postMessage("audioSwitch","*"); 
}

function checkCompletion() {
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('completed')) {
        previouslyCompleted = parseInt(searchParams.get('completed'));
        console.log("checkCompletion: previouslyCompleted: "+previouslyCompleted)
    }
}

function checkAudio() {
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('audio')) {
        muted = parseInt(searchParams.get('audio'));
        console.log("checkAudio: muted: "+muted)
    } 
    if(muted) {
        muteOnLoad();
    }
}

function muteOnLoad() {
    responsiveVoice.cancel();
    muted = 1;
    jQuery("#replay").attr("title","Audio muted, unmute to play");
    jQuery("#mute").addClass("muted").text('volume_up').attr("title","Unmute");
    jQuery("#playPause").removeClass("pause").text("play_arrow").attr("title","Audio muted, unmute to play");
    console.log("muteOnLoad: audio muted onload");
}