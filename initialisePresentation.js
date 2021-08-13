loadedScripts++;
// initialise presentation

// set activity variables
let totalPages = 1;
let currentSlide = 1;
let totalReveals = 0;
let viewedReveals = 0;
let revealsDefined = 0;
let activityComplete = 0;
let forwardNavEnabled = 1;
let courseInitialised = 0;
var initialiseProject;
jQuery(document).ready(function() {
    initialiseProject = setInterval(function() {initialise();}, 5);
});

/* all activity initialise functions*/

function initialise() {
    if(loadedScripts==requiredScripts) {
        clearInterval(initialiseProject);
        console.log("initialise start");
        definePages();
        defineReveals();
        addSlideNav();
        addAudioController();
        addProgressBar();
        //speak the content on the first slide
        let currentText = jQuery("#page0").contents().text();
        let speakable = currentText.toString();
        playAudio(speakable);
        console.log("initialise finished");
    }
}

function definePages() {
    jQuery("h2").each(function() {
        //add a class to identify the page
        jQuery(this).addClass("page"+totalPages);
        //hide all content
        jQuery(this).nextUntil("h1").css("display","none");
        //hide the first h2
        jQuery(this).css("display","none");
        //getting a count of all pages
        totalPages++;
    });
}

function defineReveals() {
    if(!revealsDefined) {
        jQuery("h3").each(function() {
            //count the reveals by counting the h3s
            let currentReveal = totalReveals+1;
            //give each h3 a unique numbered class
            jQuery(this).addClass("reveal"+currentReveal);
            //add reveal event to h3
            jQuery(this).on("click", revealContent);
            //increment the count of totalReveals
            totalReveals++;
        });
    }
    revealsDefined = 1;
    tallyRequirements();
    pagination();
}

function pagination(){
    jQuery("h1").each(function() {
        jQuery("<div id='container'><div id='page0' class='firstPage'></div></div>").insertBefore("#page");
        let content = jQuery(".entry-header, .entry-content").contents();
        jQuery("#page0").append(content);
        jQuery("body").addClass("firstPage");
    });
    let currentPage = 1;
    jQuery("#container h2").each(function() {
        jQuery("<div id='page"+currentPage+"' class='page'></div>").appendTo("#container");
        if(currentPage==jQuery("#container h2").length) {
            let lastPage = '#page'+currentPage;
            jQuery(lastPage).addClass('lastPage');
        }
        currentPage++;
        
  });
    getContent();
}

function getContent(){
    jQuery("#container div").each(function(index) {
        if(index!==0) {
        let current = index;
        jQuery('#container h2.page'+current).nextUntil("h2, div").appendTo("#page"+current);
        jQuery("h2.page"+current).prependTo("#page"+current);
        //jQuery(this).append(content);
        console.log("current is: #page"+current);
        }
    });
    let currentReveal = 1;
    jQuery("#container h3").each(function(index) {
        jQuery("<div id='reveal"+currentReveal+"' class='revealedContent'></div>").insertAfter(jQuery(this));
        //insert a div and append h3 to div and change h3 css selector
        jQuery(this).append('<span class="tick material-icons">check_circle</span>');
        currentReveal++;

  });
    jQuery("#container h3").each(function(index) {
        var currentReveal = index+1;
        jQuery(this).nextUntil("h3, div:not('#reveal"+currentReveal+"')").appendTo("#reveal"+currentReveal);
        let revealHasImage = jQuery("#reveal"+currentReveal).find("img");
        if(revealHasImage.length !==0){
                jQuery(revealHasImage).each(function() {
                    if(jQuery(this).parent().hasClass("diagram")){
                        jQuery(".reveal"+currentReveal).addClass("full-screen-diagram");
                        console.log("has diagram");
                    } else {
                        jQuery(".reveal"+currentReveal).addClass("full-screen");
                        console.log("no diagram");
                    }
                });
        }
        console.log("getContent: Reveal has image: "+revealHasImage);
    });
    jQuery("<div class='decorativeShape'></div>").appendTo(jQuery("#container"));
    jQuery("#page.site").css("display", "none");
    
}

