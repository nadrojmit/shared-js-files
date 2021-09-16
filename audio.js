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
        jQuery("#controllerContainer").append('<nav id="audioController" class="audioController"><button type="buton" id="playPause" title="Play" class="material-icons">play_arrow</button>&nbsp<button type="buton" title="Replay from start" id="replay" class="material-icons">replay</button>&nbsp<button title="Mute" type="buton" id="mute" class="material-icons">volume_off</button></nav>');
        console.log("addAudioController: controller added");
        //add the audio functions
        jQuery("#playPause").on("click", pausePlay);
        jQuery("#replay").on("click", replay);
        jQuery("#mute").on("click", mute);
    });
    checkAudio();
}

function playAudio(text){
    text = text.replace(/,/g, "");
    lastPlayed = text;
    if(!muted){
        responsiveVoice.speak(text,'UK English Female',{onend: audioEnd});
        jQuery("#playPause").addClass("pause").text("pause").attr("title","Pause");
        playing = 1;
        }
}

function pausePlay() {
    if(!muted){
        if(playing){
            responsiveVoice.pause();
            jQuery("#playPause").removeClass("pause").text("play_arrow").attr("title","Play");
            playing = 0;
        }
        else {
            if(replayFromPlay) {
                playAudio(lastPlayed);
                replayFromPlay = 0;
            } else {
                responsiveVoice.resume();
            }
            jQuery("#playPause").addClass("pause").text("pause").attr("title","Pause");
            playing = 1;
        }
    }
}

function audioEnd() {
    jQuery("#playPause").removeClass("pause").text("play_arrow").attr("title","Play");
    playing = 0;
    replayFromPlay = 1;
}

function replay(){
    responsiveVoice.cancel();
    playAudio(lastPlayed);
}

function mute(){
    if(!muted) {
        console.log("mute: audio muted");
        responsiveVoice.cancel();
        muted = 1;
        jQuery("#mute").addClass("muted").text('volume_up').attr("title","Unmute");
        jQuery("#playPause").removeClass("pause").text("play_arrow").attr("title","Audio muted, unmute to play");
        jQuery("#replay").attr("title","Audio muted, unmute to play");
    } else {
        console.log("mute: audio unmuted");
        muted = 0;
        jQuery("#mute").removeClass("muted").text('volume_off').attr("title","Mute");
        jQuery("#playPause").attr("title","Play");
        jQuery("#replay").attr("title","Replay from start");
    }
    setAudioPreference();
}

function cancelAudio(){
    //console.log("cancelAudio: Audio cancelled");
    //responsiveVoice.speak(" ");
    console.log("cancelAudio: audio cancelled");
    responsiveVoice.cancel();
    jQuery("#playPause").removeClass("pause").text("play_arrow");
}
