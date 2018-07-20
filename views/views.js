var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. In this study you will...",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {
        
        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "Instructions on how to do the exp",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

    },
    trials: 1
};

var practice = {
    name: 'practice',
    "title": "Practice trial",
    // render function renders the view
    render: function (CT) {

        viewTemplate = $("#practice-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            sentence: exp.trial_info.practice_trials[CT].sentence.split(" ")
        }));
        var startingTime = Date.now();
        var sentence = initSentence();
        var readingDates = [];
        var readingTimes = [];
        var rtCount = exp.trial_info.practice_trials[CT].sentence.split(" ").length;


        // creates one continuous underline below the sentence if it was set to true in config.js
        if (exp.underlineOneLine === true) {
            var words = $(".word");

            for (var i=0; i<words.length; i++) {
                $(words[i]).css('margin', '0 -3px');
            }
        }

        // hides the fixation point and shows the stimulus
        var showStimulus = function() {
            $('.stimulus').removeClass('nodisplay');
            $('.cross-container').addClass('nodisplay');
        };

        // blank screen
        setTimeout(function() {
            $('.cross-container').removeClass('nodisplay');
            setTimeout(showStimulus, exp.crossDuration);     
        }, exp.pause);

        // checks the expSettings in config.js and depending on the settings
        // either show the image for a particular amount of time
        if (exp.hideImage === true) {
            setTimeout(function() {
                // add a css class to the image to hide it
                $('.img').addClass('nodisplay');
                $('.sentence').removeClass('nodisplay');

                // attaches an event listener for key pressed
                // called handleKeyDown() when a key is pressed. (handleKeyDown() checks whether the key is space)
                $('.help-text').removeClass('hidden');
                $('body').on('keydown', handleKeyDown);
            }, exp.stimulusDuration + exp.pause + exp.crossDuration);
        // or the image does not disappear at all
        } else {
             setTimeout(function() {
                $('.help-text').removeClass('hidden');
                $('.sentence').removeClass('nodisplay');
                $('body').on('keydown', handleKeyDown);
            }, exp.pause + exp.crossDuration);
        }

        // checks whether the key pressed is space and if so calls sentence.showNextWord()
        // handleKeyDown() is called when a key is pressed
        var handleKeyDown = function(e) {
            if (e.which === 32) {
                $('.help-text').addClass('hidden');
                sentence.showNextWord();

                // collects the dates (unix time) in a variable readingDates every time a word is shown
                if (rtCount >= 0) {
                    readingDates.push(Date.now());
                }
                rtCount--;
            }
        };

        // converts the readingDates into readingTimes by substracting
        // returns a list of readingTimes
        var getDeltas = function() {
            var deltas = [];

            for (var i = 0; i < readingDates.length - 1; i++) {
                deltas[i] = readingDates[i+1] - readingDates[i];
            };

            return deltas;
        };

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                sentence: exp.trial_info.practice_trials[CT].sentence,
                response: $('input[name=answer]:checked').val(),
                RT: RT,
                readingTimes: getDeltas()
            };

            exp.trial_data.push(trial_data);
            $('body').off('keydown', handleKeyDown);
            exp.findNextView();
        });
    },

    trials: 2
};

var beginMainExp = {
    name: 'beginMainExp',
    "text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.",
    // render function renders the view
    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};


var main = {
    name: 'main',
    // render function renders the view
    render: function(CT) {

        viewTemplate = $("#practice-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            sentence: exp.trial_info.main_trials[CT].sentence.split(" ")
        }));
        var startingTime = Date.now();
        var sentence = initSentence();
        var readingDates = [];
        var readingTimes = [];
        var rtCount = exp.trial_info.main_trials[CT].sentence.split(" ").length;


        // creates one continuous underline below the sentence if it was set to true in config.js
        if (exp.underlineOneLine === true) {
            var words = $(".word");

            for (var i=0; i<words.length; i++) {
                $(words[i]).css('margin', '0 -3px');
            }
        }

        // hides the fixation point and shows the stimulus
        var showStimulus = function() {
            $('.stimulus').removeClass('nodisplay');
            $('.cross-container').addClass('nodisplay');
        };

        // blank screen
        setTimeout(function() {
            $('.cross-container').removeClass('nodisplay');
            setTimeout(showStimulus, exp.crossDuration);     
        }, exp.pause);

        // checks the expSettings in config.js and depending on the settings
        // either show the image for a particular amount of time
        if (exp.hideImage === true) {
            setTimeout(function() {
                // add a css class to the image to hide it
                $('.img').addClass('nodisplay');
                $('.sentence').removeClass('nodisplay');

                // attaches an event listener for key pressed
                // called handleKeyDown() when a key is pressed. (handleKeyDown() checks whether the key is space)
                $('.help-text').removeClass('hidden');
                $('body').on('keydown', handleKeyDown);
            }, exp.stimulusDuration + exp.pause + exp.crossDuration);
        // or the image does not disappear at all
        } else {
             setTimeout(function() {
                $('.help-text').removeClass('hidden');
                $('.sentence').removeClass('nodisplay');
                $('body').on('keydown', handleKeyDown);
            }, exp.pause + exp.crossDuration);
        }

        // checks whether the key pressed is space and if so calls sentence.showNextWord()
        // handleKeyDown() is called when a key is pressed
        var handleKeyDown = function(e) {
            if (e.which === 32) {
                $('.help-text').addClass('hidden');
                sentence.showNextWord();

                // collects the dates (unix time) in a variable readingDates every time a word is shown
                if (rtCount >= 0) {
                    readingDates.push(Date.now());
                }
                rtCount--;
            }
        };

        // converts the readingDates into readingTimes by substracting
        // returns a list of readingTimes
        var getDeltas = function() {
            var deltas = [];

            for (var i = 0; i < readingDates.length - 1; i++) {
                deltas[i] = readingDates[i+1] - readingDates[i];
            };

            return deltas;
        };

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "main",
                trial_number: CT+1,
                sentence: exp.trial_info.main_trials[CT].sentence,
                response: $('input[name=answer]:checked').val(),
                RT: RT,
                readingTimes: getDeltas()
            };

            exp.trial_data.push(trial_data);
            $('body').off('keydown', handleKeyDown);
            exp.findNextView();
        });
    },
    trials: 2
};

var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};