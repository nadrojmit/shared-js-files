


function cancelAudio(){
    //console.log("cancelAudio: Audio cancelled");
    //responsiveVoice.speak(" ");
    responsiveVoice.cancel();
}

//reveal functions

function resetReveals() {
    //reset the reveal count for the page
    totalReveals = 0;
    //reset viewed reveals for the page
    viewedReveals = 0;  
    //for all the visible h3s, hide the text content between them
    jQuery("h3:visible").each(function() {
        jQuery(this).nextUntil("h3, h2").css("display","none");
        //count the reveals by counting the h3s
        let currentReveal = totalReveals+1;
        //add reveal event to h3
        jQuery(this).on("click", revealContent);
        //increment the count of totalReveals
        totalReveals++;
    });
}

function revealContent() {
    console.log("revealContent start");
    //stop current audio
    cancelAudio();
    //increment viewed reveals
    viewedReveals++;
    //hide all revealed content before showing new content
    hideReveal();
    //set currently selected heading to current, remove reveal function and add hide function
    jQuery(this).addClass("currentReveal");
    console.log("revealContent: current class removed and revealContent added back to previous current link");
    console.log("reveal"+totalReveals);
    //show relevant content
    //if this is the final reveal, show text until next h2, otherwise show till next h3
    if(jQuery(this).hasClass("reveal"+totalReveals)) {
        jQuery(this).nextUntil("h2, h3").css("display","block");    
    } else {
        jQuery(this).nextUntil("h2, h3").css("display","block");
    }
    //append close button to the last visible para
    jQuery("p:visible").last().append('<button type="buton" id="close">CLOSE</button>');
    //add hideReveal function to close button
    jQuery("#close").on("click", hideReveal);
    //check if all reveals have been seen and, if so, enable next button
    if(viewedReveals==totalReveals) {
        jQuery("#next").removeClass("disabled");
        jQuery("h2.current").addClass("completed");
    }
    //add all text in current reveal to variable and post to responsive voice to speak
    let currentText = jQuery(this).nextUntil("button").text();
    //responsiveVoice.speak(currentText);
    console.log("revealContent finish");
}


function hideReveal() {
    console.log("hide reveal starts");
    //stop currently playing audio
    cancelAudio();
    //hide all revealed content
    jQuery("#close").remove();
    jQuery("h3.currentReveal").nextUntil("h3, h2").css("display","none");
    jQuery("h3.currentReveal").removeClass("currentReveal");
    console.log("hide reveal finishes");
    jQuery("#slideNav").css("display","block");
}

// root container functions

function closeLightbox() {
    alert("Lightbox closes");
    //parent.closeLightboxWindow();
}





