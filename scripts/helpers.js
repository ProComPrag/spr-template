// HELPERS:
// functions shared between more than two views or long functions

// attached exp.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in exp.findNextView() which is located in main.js
var showNextView = function() {
    var nexts = $('.next-view');

    for (var i=0; i<nexts.length; i++){
        if (nexts[i].id === 'sends-data') {
            nexts[i].addEventListener('click', function() {
                for (var i=0; i<exp.data.trials.length; i++) {
                    exp.data.trials[i].age = $('#age').val(),
                    exp.data.trials[i].gender = $('#gender').val(),
                    exp.data.trials[i].education = $('#education').val(),
                    exp.data.trials[i].languages = $('#languages').val(),
                    exp.data.trials[i].comments = $('#comments').val().trim()
                }

                exp.findNextView();
            });
        } else {
            nexts[i].addEventListener('click', function() {
                exp.findNextView();
            });
        }
    }
};


// creates a sentence object that has showNextWord() function
var initSentence = function() {
    var sentence = {};
    // keeps track of word to be shown
    var currentWord = -1;

    // picks the word that should be shown when space is clicked
    // when there are no more words to show, the response buttons and help text appear
    sentence.showNextWord = function() {
        var words = $('.word').toArray();

        currentWord++;
        if (currentWord < words.length){
            $(words[currentWord]).addClass('visible');
            $(words[currentWord -1]).removeClass('visible');
        }
        // when all the words have been shown, the last one is hidden
        // and the response buttons appear
        else {
            // hides last word
            $(words[currentWord -1]).removeClass('visible');
            // shows the response buttons
            $('.question').removeClass('nodisplay');
        }
    };

    return sentence;
};