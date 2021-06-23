// count total subheadings
let totalSubheadings = 0;
$(document).ready(function() {
    //once loaded loop headings and hide subcontent
    hideAll();
    //add click to reveal to headings
    $("h3, h4").each(function() {
        $(this).on("click", revealContent);
    });
    console.log("articleFixer: Document ready - total subheadings: "+totalSubheadings);
});

function hideAll() {
    console.log("hideAll start");
    //hide all subcontent and add spacing
    $("h3, h4").each(function() {
        totalSubheadings = totalSubheadings + 1;
        $(this).nextUntil("h3, h4").css("display","none");
        $(this).css("padding-top","20px !important");
        $(this).css("padding-bottom","20px !important");
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
    $(".current").on("click", revealContent);
    $(".current").off("click", hideContent);
    $(".current").removeClass("current");
    console.log("revealContent: current class removed and revealContent added back to previous current link");
    //set currently selected heading to current, remove reveal function and add hide function
    $(this).addClass("current");
    $(".current").off("click", revealContent);
    $(".current").on("click", hideContent);
    console.log("revealContent: current class added and hideContent added");
    //show relevant content
    $(this).nextUntil("h3, h4").css("display","block");
    //add all text in current reveal to variable and post to responsive voice to speak
    let currentText = $(this).nextUntil("h3, h4").text();
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
    $(this).removeClass("current");
    $(this).off("click", hideContent);
    $(this).on("click", revealContent);
    console.log("hide content finishes");
}

function cancelAudio(){
    console.log("cancelAudio: Audio cancelled");
    //responsiveVoice.speak(" ");
    responsiveVoice.cancel();
}

