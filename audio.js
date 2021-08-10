loadedScripts++;
//audio settings
//audio preference is set to mute
let muted = 0;
//audio is currently playing
let playing = 0;
//text to replay
let lastPlayed;
//replaying audio from play button when finished
let replayFromPlay = 0;

// audio functions
function addAudioController() {
jQuery("h1").each(function() {
        //attach audio controller
        jQuery("#controllerContainer").append('<nav id="audioController" class="audioController"><button type="buton" id="playPause" class="material-icons">pause</button>&nbsp<button type="buton" id="replay" class="material-icons">replay</button>&nbsp<button type="buton" id="mute" class="material-icons">volume_off</button></nav>');
        //add the audio functions
        jQuery("#playPause").on("click", pausePlay);
        jQuery("#replay").on("click", replay);
        jQuery("#mute").on("click", mute);
    });
}

function playAudio(text){
    text = text.replace(/,/g, "");
    lastPlayed = text;
    if(!muted){
        responsiveVoice.speak(text,'UK English Female',{onend: audioEnd});
        jQuery("#playPause").addClass("pause").text("pause");
        playing = 1;
        }
}

function pausePlay() {
    if(!muted){
        if(playing){
            responsiveVoice.pause();
            jQuery("#playPause").removeClass("pause").text("play_arrow");
            playing = 0;
        }
        else {
            if(replayFromPlay) {
                playAudio(lastPlayed);
                replayFromPlay = 0;
            } else {
                responsiveVoice.resume();
            }
            jQuery("#playPause").addClass("pause").text("pause");
            playing = 1;
        }
    }
}

function audioEnd() {
    jQuery("#playPause").removeClass("pause").text("play_arrow");
    playing = 0;
    replayFromPlay = 1;
}

function replay(){
    responsiveVoice.cancel();
    playAudio(lastPlayed);
}

function mute(){
    if(!muted) {
        responsiveVoice.cancel();
        muted = 1;
        jQuery("#mute").addClass("muted").text('volume_up');
        jQuery("#playPause").removeClass("pause").text("play_arrow");
    } else {
        muted = 0;
        jQuery("#mute").removeClass("muted").text('volume_off');
    }
}

function cancelAudio(){
    //console.log("cancelAudio: Audio cancelled");
    //responsiveVoice.speak(" ");
    responsiveVoice.cancel();
    jQuery("#playPause").removeClass("pause").text("play_arrow");
}
