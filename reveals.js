loadedScripts++;
// Reveals

//reveal functions

function resetReveals() {
    console.log("resetReveals runs");
    //reset the reveal count for the page
    totalReveals = 0;
    //reset viewed reveals for the page
    viewedReveals = 0;  
    //for all the visible h3s, hide the text content between them
    jQuery("h3:visible").each(function() {
        jQuery(this).nextUntil("h3, h2").css("display","none");
        //count the reveals by counting the h3s
        let currentReveal = totalReveals+1;
        //increment the count of totalReveals
        totalReveals++;
        if(jQuery(this).hasClass("clicked")) {
            totalReveals--; }
            //reveal count reduced by one becuase buttons have been clicked already
    });
}

function revealContent() {
    console.log("revealContent start");
    let fullScreen = 0;
    //stop current audio
    cancelAudio();
    //increment viewed reveals
    if(!jQuery(this).hasClass("clicked")){viewedReveals++; updateProgress();}
    jQuery(this).addClass("clicked");
    //hide all revealed content before showing new content
    hideReveal();
    //set currently selected heading to current, remove reveal function and add hide function
    jQuery(this).addClass("currentReveal");
    //get the number of the current reveal from the button
    let cls = jQuery(this).attr('class').split(' ')[0];
    //get ID of current page
    let currentClass = jQuery(this.closest("div")).attr('id').split(' ')[0];
    let currentPageID = currentClass.substr(currentClass.length -1);
    let currentPage = "#page"+currentPageID;
    
    //hide rest of content if this is a full screen reveal
    let fullScreenReveal = jQuery(this).hasClass("full-screen");
    let fullScreenDiagram = jQuery(this).hasClass("full-screen-diagram");
    if((fullScreenReveal)||(fullScreenDiagram)){
        jQuery(currentPage).contents().css('display','none'); 
        jQuery("#slideNav").css('display','none'); 
        jQuery("#slideNav").contents().css('display','none'); 
        fullScreen = 1;
        jQuery("body").scrollTop(0);
        if(fullScreenDiagram) { 
            updateBody('fullScreenReveal diagram'); } 
        else {
            updateBody('fullScreenRevealImg');
            } 
    } else {
        let scrollPageTo = jQuery(this).offset().top * 0.8;
        jQuery("body").scrollTop(scrollPageTo);
    }
    let currentReveal = cls.substr(6);
    console.log("revealContent: currentReveal ID: "+currentReveal);
    //let currentReveal = cls.substr(cls.lastIndexOf("1"));
    let revealToShow = "#reveal"+currentReveal;
    jQuery(revealToShow).css("display","block");
    jQuery(revealToShow+" img").css("display","block");
    jQuery(revealToShow).contents().css("display","block");
    jQuery(revealToShow).first().focus();
    jQuery('<button type="buton" id="close">CLOSE</button>').appendTo(revealToShow);
    //add hideReveal function to close button
    jQuery("#close").on("click", hideReveal);
    if(fullScreen) {jQuery("#close").addClass("fullscreen");}
    //check if all reveals have been seen and, if so, enable next button
    if(viewedReveals==totalReveals) {
        jQuery("#next").removeClass("disabled");
        jQuery("h2.current").addClass("completed");
    }
    
    //add all text in current reveal to variable and post to responsive voice to speak
    let currentText = jQuery(revealToShow+" :not(#close, ul)").text();
    let speakable = currentText.toString();
    playAudio(speakable);
    console.log(currentText);
    
    //move audio player to side bar
    jQuery("#audioController").addClass("onScroll");
    //check page content fits within page
    checkPageHeight(currentPage);
    console.log("revealContent finish");
}


function hideReveal() {
    console.log("hide reveal starts");
    //stop currently playing audio
    cancelAudio();
    if(jQuery("#close").hasClass("fullscreen")){ jQuery(this.closest(".page")).contents(":not(.revealedContent)").css('display','block'); jQuery("#slideNav").contents().css('display','block'); updateBody('middleScreen'); }
    //hide all revealed content
    jQuery("#close").closest('div').css("display","none");
    jQuery("#close").remove();
    jQuery("h3.currentReveal").removeClass("currentReveal");
    console.log("hide reveal finishes");
    jQuery("#slideNav").css("display","block");
    //move audio player to bottom
    if(!longPage) {jQuery("#audioController").removeClass("onScroll");}
}
