// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    
    // specify view order
    this.views_seq = [intro, 
                     instructions,
                     practice,
                     beginMainExp,
                     main,
                     /*loop([practice,
                     beginMainExp,
                     main], 2),*/
                     postTest,
                     thanks];

    // prepare information about trials (procedure)
    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials.concat(practice_trials));
    this.trial_info.practice_trials = practice_trials;

    // self-paced reading specific settings

    // stimulus duraton in ms
    this.stimulusDuration = 1000;
    // hides the stimulus after stimulusDuration amount of time
    this.hideImage = false;
    // continuous sentence underline
    this.underlineOneLine = false;
    // fixation cross duraton before the stimulus in ms. Set to 0 for no cross
    this.crossDuration = 500;
    // pause between the trials in ms
    this.pause = 500;

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ['practice', 'main'];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'separate';
    // the width of the progress bar or a single chunk in pixels
    this.progress_bar_width = 100;
};