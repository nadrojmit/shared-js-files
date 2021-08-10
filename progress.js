loadedScripts++;
// progress tracking
let allContent = 0;
let currentUserProgress = 1;

function tallyRequirements() {
    allContent = totalPages+totalReveals;
    console.log("tallyRequirements: Total requirements are: "+allContent);
}

function updateProgress() {
    currentUserProgress++;
    let currentProgress = currentUserProgress / allContent * 100;
    //jQuery(".ldBar").attr('data-value', currentProgress);
    updateProgressBar(currentProgress);
    console.log("updateProgress: Total requirements are: "+allContent);
    console.log("updateProgress: % complete: "+currentProgress);
    console.log("updateProgress: Current user progress is: "+currentUserProgress);
}

function addProgressBar() {
    jQuery('<div id="progressBar"><div id="progress"></div></div>').insertBefore("#slideNav");;
}

function updateProgressBar(currentProgress) {
    var newWidth = currentProgress+"%"
    jQuery("#progress").css("width",newWidth);
}

