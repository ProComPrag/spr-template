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
    if (this.currentViewStepCounter < config_general.viewSteps[this.currentViewCounter]) {
        this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
        this.currentViewStepCounter ++; 
    } else {
        this.currentViewCounter ++; 
        this.currentViewStepCounter = 0;
        this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
        this.currentViewStepCounter ++;
    }
};

exp.init = function() {
    /*// CPT - current practice trial
    this.CPT = 0;

    // CT - current trial
    this.CT = 0;


    // generated the view
    this.view = initIntroView();
    
    // to be done: get TT and TPT from the model, this now is a temp solution
    // TPT - total practice trials
    this.TPT = practice_trials.length;

    // TT - total trials
    this.TT = this.data.trials.length;*/

    // record current date and time
    this.startDate = Date();
    this.startTime = Date.now();

    // initialize counters and generate first view
    this.currentViewCounter = 0;
    this.currentViewStepCounter = 0;
    this.view = this.findNextView();
    // generates the experiment and assigns it to this.data
    this.data = initExp();
};