// creates Practice view
var initPracticeView = function(CT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    var trialInfo = exp.data.practice_trials;
    var sentence = initSentence();

    $('#main').html(Mustache.render(view.template, {
        title: config_views.practice.title,
        helpText: config_general.expSettings.helpText,
        sentence: exp.data.trials[CT].sentence.split(" ")
    }));

    // creates one continuous underline below the sentence if it was set to true in config.js
    if (config_general.expSettings.underlineOneLine === true) {
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
        setTimeout(showStimulus, config_general.expSettings.crossDuration);     
    }, config_general.expSettings.pause);


    // checks the expSettings in config.js and depending on the settings
    // either show the image for a particular amount of time
    if (config_general.expSettings.hideImage === true) {
        setTimeout(function() {
            // add a css class to the image to hide it
            $('.img').addClass('nodisplay');
            $('.sentence').removeClass('nodisplay');

            // attaches an event listener for key pressed
            // called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
            $('.help-text').removeClass('hidden');
            $('body').on('keyup', handleKeyUp);
        }, config_general.expSettings.showDuration + config_general.expSettings.pause + config_general.expSettings.crossDuration);
    // or the image does not disappear at all
    } else {
         setTimeout(function() {
            $('.help-text').removeClass('hidden');
            $('.sentence').removeClass('nodisplay');
            $('body').on('keyup', handleKeyUp);
        }, config_general.expSettings.pause + config_general.expSettings.crossDuration);
    }

    // checks whether the key pressed is space and if so calls sentence.showNextWord()
    // handleKeyUp() is called when a key is pressed
    var handleKeyUp = function(e) {
        if (e.which === 32) {
            $('.help-text').addClass('hidden');
            sentence.showNextWord();
        }
    };

    $('input[name=question]').on('change', function() {
        $('body').off('keyup', handleKeyUp);
        exp.findNextView();
    });

    return view;
};