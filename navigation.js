loadedScripts++;
// Presentation navigation
function addSlideNav() {
    jQuery("h1").each(function() {
        //attach a next button to the first page
        jQuery("#container").append('<div id="controllerContainer"><nav id="slideNav"><button type="buton" id="back">BACK</button>&nbsp<button type="buton" id="next">NEXT</button></nav></div>');
        //add the back button function
        jQuery("#back").on("click", navigateBack);
        jQuery("#back").css("display", "none");
        jQuery("#next").on("click", progressSlide);
    });
}

// all slide navigation functions
function progressSlide() {
    if(!jQuery(this).hasClass("disabled")){
        //hide all displayed content
        hideAll();
        hideLeftOpenReveals();
        //move audio player to bottom and reset long page
        jQuery("#audioController").removeClass("onScroll");
        longPage = 0;
        //manually padding added to bottom of page variable, this can be removed once the reset padding function works properly
        paddingAdded = 0;
        //remove the class current from the previous page
        jQuery("h2.current").removeClass("current");
        //show on the next h2 and add the class current to it
        jQuery(".page"+currentSlide).css("display","block");
        if(!jQuery(".page"+currentSlide).hasClass("viewed")){updateProgress();}
        jQuery(".page"+currentSlide).addClass("viewed");
        jQuery(".page"+currentSlide).addClass("current");
        if(!jQuery(".current").closest(".page").hasClass("lastPage, firstPage")){
            updateBody('middleScreen');
        } 
        //show all of the content between the current h2 and the next h2
        jQuery(".page"+currentSlide).nextUntil("h2, #next").css("display","block");
        resetReveals();
        let currentPage = "#page"+currentSlide;
        //remove bottom padding if it was added on last page
        let lastPage = currentSlide-1;
        clearBottomPadding(lastPage);
        jQuery(currentPage+" :not(h3) img").css('display','block');
        //totalPages doesn't work for this, need to revist to see if totalPages can be used here without breaking other stuff
        let actualSlideCount = totalPages-1; 
        if(currentSlide==actualSlideCount) {
            //show everything till the end of the page
            jQuery("h2.current").nextUntil("h4").css("display","block");
            //remove next slide event from next button and add close window function
            jQuery("#next").off("click", progressSlide);
            jQuery("#next").on("click", closeLightbox);
            activityComplete = 1;
            forwardNavEnabled = 0;
            updateBody('lastPage');
            completeActivity();
            console.log("final slide reached");
        } else {
            //as we've just arrived, disable the next button until the reveals are clicked unless the page is already complete
            let slideReference = currentSlide-1;
            
            if(!jQuery("h2.page"+currentSlide).hasClass("completed")) {
                if(totalReveals !== 0){
                    jQuery("#next").addClass("disabled");
                    console.log("progressSlide: next button disabled");
                };                
            }
    }
    //increment the current slide
    currentSlide++;
    console.log("currentSlide on progressSlide change is: "+currentSlide);
    
    //turn the next button on by ID at the end of the sequence
    jQuery("#slideNav").css("display","block");
    jQuery("#back").css("display","block");
    //check the content doesn't sit under audio controller
    checkLayout(currentPage);
    //check page content fits within page
    checkPageHeight(currentPage);    
    //speak current slide
    let currentText = jQuery("h2.current").nextUntil("h3, #slideNav").text();
    let speakable = currentText.toString();
    speakable = speakable.replace(/,/g, "");
    playAudio(speakable);
    console.log(currentText);
    }
}

function navigateBack(){
    console.log("navigateBack starts");
    //manually padding added to bottom of page variable, this can be removed once the reset padding function works properly
    paddingAdded = 0;
    //hide all displayed content
    hideAll();
    hideLeftOpenReveals();
    //remove the class current from the previous page
    jQuery("h2.current").removeClass("current");
    //move audio player to bottom
    jQuery("#audioController").removeClass("onScroll");
    currentSlide--;
    console.log("navigateback: currentSlide at start of function is: "+currentSlide);
    //if this is not slide 1
    if(currentSlide>1) {
        let slideNav = currentSlide-1;
        //show on the previous h2 and add the class current to it
        jQuery(".page"+slideNav).css("display","block");
        jQuery(".page"+slideNav).addClass("current");
        //show all of the content between the current h2 and the next h2
        jQuery(".page"+slideNav).nextUntil("h2, #next").css("display","block");
        jQuery("#page"+slideNav+" :not(h3) img").css('display','block');
        jQuery("#slideNav").css("display","block");
        updateBody('middleScreen');
    } else {
        console.log("navigateback: navigate back to first page");
        //remove the class current from the previous page
        jQuery("h2.current").removeClass("current");
        updateBody('firstPage');
        //show on the previous h1
        jQuery("#page0").css("display","block");
        jQuery("#page0 img").css('display', 'block');
        jQuery("#page0").contents().css("display","block");
        //hide back button as this is first page
        jQuery("#back").css("display","none");
    }
    let actualSlideCount = totalPages-1; 
    if((!forwardNavEnabled)&&(activityComplete)) {
        console.log("navigating back after completion");
        jQuery("#next").on("click", progressSlide);
        jQuery("#next").off("click", closeLightbox);
        forwardNavEnabled = 1;
    }
    
    let actualCurrentSlide = currentSlide-1;
    let currentPage = '#page'+actualCurrentSlide;
    resetReveals();
    
    //check the content doesn't sit under audio controller
    checkLayout(currentPage);
    //check page content fits within page
    checkPageHeight(currentPage);  
    //reset current page
    let lastPage = currentPage-1;
    clearBottomPadding(currentPage);
    jQuery("#next").removeClass("disabled");
     //speak current slide
    let currentText = jQuery("h2.current").nextUntil("h3").text();
    playAudio(currentText);
    console.log(currentText);
    console.log("navigateback ends");
}

function hideAll() {
    console.log("hideAll start");
    //hide all content
    jQuery("h1, h2, h3, p, ul, img").css("display","none");
    //turn next button back on
    jQuery("#next").css("display","block");
    console.log("hideAll finish");
}

function hideLeftOpenReveals() {
    //if reveals have been left open
    jQuery("h3.currentReveal").nextUntil("h3, h2").css("display","none");
    jQuery("h3.currentReveal").removeClass("currentReveal");
}

function updateBody(newClass) {
    jQuery("body").removeClass('lastPage firstPage middleScreen fullScreenReveal fullScreenRevealImg');
    jQuery("body").addClass(newClass);
}


let longPage = 0;
function checkLayout(currentPage) {
    console.log("checkLayout: currentPage passed is: "+currentPage);
    let pageHeight = jQuery(currentPage).height();
    let pageOffset = jQuery(currentPage).offset().top;
    let pagePosition = pageHeight + pageOffset; 
    let controllerOffest = jQuery("#audioController").offset().top;
    console.log("checkLayout: pageHeight: "+pageHeight+" pageOffset: "+pageOffset+" pagePosition: "+pagePosition+" controllerOffset from Top: "+controllerOffest);
    if(pagePosition >= controllerOffest) {
       //move audio player to side bar
        jQuery("#audioController").addClass("onScroll");
        longPage = 1;
        console.log("content touches audio bar so moved to side");
       }
}

let paddingAdded = 0;
function checkPageHeight(currentPage) {
    console.log("checkPageHeight runs");
    if(!paddingAdded){
        let currentPageHeight = jQuery(currentPage).height();
        let pageOffset = jQuery(currentPage).offset().top;
        let pagePosition = currentPageHeight + pageOffset;
        let controllerOffest = jQuery("#controllerContainer").offset().top;
        let controllerHeight = jQuery("#controllerContainer").height()+10;
        console.log("checkPageHeight: currentPageHeight: "+currentPageHeight+" pageOffset: "+pageOffset+" pagePosition: "+pagePosition+" controllerOffset from Top: "+controllerOffest);
        if(pagePosition>=controllerOffest) {
                jQuery(currentPage).css("padding-bottom", controllerHeight);
                paddingAdded = 1;
                console.log("revealed content exceeds page height so padding added to bottom");
           }
    }
}

function clearBottomPadding(currentPage){
    jQuery("#page"+currentPage).css("padding-bottom", "0");
    console.log("bottom padding removed from bottom of page: currentPage ID"+currentPage);
}