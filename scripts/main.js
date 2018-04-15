// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {    
    exp.init();
    // prevent scrolling when space is pressed (firefox does it)
    window.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    }
});

// empty shells for 'exp' and 'config_views' objects;
// to be filled with life later
var exp = {};


// navigation through the views and steps in each view;
// shows each view (in the orders defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
    // shows the same view template
    if (this.currentViewStepCounter < config_general.viewSteps[this.currentViewCounter]) {
        this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
        this.currentViewStepCounter ++;
    // shows the same view template
    } else {
        this.currentViewCounter ++; 
        this.currentViewStepCounter = 0;
        this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
        this.currentViewStepCounter ++;
    }
};

// creates and sets variables when the page is loaded.
exp.init = function() {
    console.log('exp created');
    this.data = initExp();
    this.data.startDate = Date();
    this.data.startTime = Date.now();
    this.data.userAgent = window.navigator.userAgent;

    // initialize counters and generate first view
    this.currentViewCounter = 0;
    this.currentViewStepCounter = 0;
    this.view = this.findNextView();
};

// submits the data
exp.submit = function() {
    // needed for private server
    var data = {
        author: config_deploy.author,
        experiment_id: config_deploy.experiment_id,
        trials: exp.data.out,
        description: config_deploy.description,
        startDateTime: exp.data.startDate,
        totalExpTimeMinutes: (Date.now() - exp.data.startTime) / 60000,
        age: exp.data.out.age,
        gender: exp.data.out.gender,
        education: exp.data.out.education,
        languages: exp.data.out.languages,
        comments: exp.data.out.comments,
        userAgent: exp.data.userAgent
    };

    // parses the url to get thr assignmentId and workerId
    var getHITData = function() {
        var url = window.location.href;
        var qArray = url.split('?');
        qArray = qArray[1].split('&');
        var HITData = {};

        for (var i=0; i<qArray.length; i++) {
            HITData[qArray[i].split('=')[0]] = qArray[i].split('=')[1];
        }

        return HITData;
    };

    // add more fields depending on the deploy method
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();

        // MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
        data['assignmentId'] = HITData['assignmentId'];
        data['workerId'] = HITData['workerId'];
        data['HITId'] = HITData['HITId'];
    } else if (config_deploy.deployMethod === 'Prolific') {
        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'directLink'){
        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'debug') {

    } else {
        console.log('no such config_deploy.deployMethod');
    }

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log('submits');
        submitResults(config_deploy.contact_email, data);
    } else {
        // hides the 'Please do not close the tab.. ' message in debug mode
        $('.warning-message').addClass('nodisplay');
        jQuery('<h4/>', {
            text: 'Debug Mode'
        }).appendTo($('.view'));
        jQuery('<p/>', {
            class: 'debug-results',
            text: JSON.stringify(data)
        }).appendTo($('.view'));
    }
};