// count total subheadings
let totalSubheadings = 0;
jQuery(document).ready(function() {
    //once loaded loop headings and hide subcontent
    hideAll();
    //add click to reveal to headings
    jQuery("h1, h2").each(function() {
        jQuery(this).on("click", revealContent);
    });
    console.log("articleFixer: Document ready - total subheadings: "+totalSubheadings);
});

function hideAll() {
    console.log("hideAll start");
    //hide all subcontent and add spacing
    jQuery("h1, h2").each(function() {
        totalSubheadings = totalSubheadings + 1;
        jQuery(this).nextUntil("h1, h2").css("display","none");
        jQuery(this).css("padding-top","20px !important");
        jQuery(this).css("padding-bottom","20px !important");
    });
    console.log("hideAll finish");

}

function revealContent() {
    console.log("revealContent start");
    //stop current audio
    cancelAudio();
    //hide all revealed content before showing new content
    hideAll();
    //reset currently selected heading to reveal when clicked before revealing new content
    jQuery(".current").on("click", revealContent);
    jQuery(".current").off("click", hideContent);
    jQuery(".current").removeClass("current");
    console.log("revealContent: current class removed and revealContent added back to previous current link");
    //set currently selected heading to current, remove reveal function and add hide function
    jQuery(this).addClass("current");
    jQuery(".current").off("click", revealContent);
    jQuery(".current").on("click", hideContent);
    console.log("revealContent: current class added and hideContent added");
    //show relevant content
    jQuery(this).nextUntil("h1, h2").css("display","block");
    //add all text in current reveal to variable and post to responsive voice to speak
    let currentText = jQuery(this).nextUntil("h1, h2").text();
    responsiveVoice.speak(currentText);
    console.log("revealContent finish");
}


function hideContent() {
    console.log("hide content starts");
    //stop currently playing audio
    cancelAudio();
    //hide all revealed content
    hideAll();
    //remove hide function and add show function
    jQuery(this).removeClass("current");
    jQuery(this).off("click", hideContent);
    jQuery(this).on("click", revealContent);
    console.log("hide content finishes");
}

function cancelAudio(){
    console.log("cancelAudio: Audio cancelled");
    //responsiveVoice.speak(" ");
    responsiveVoice.cancel();
}

