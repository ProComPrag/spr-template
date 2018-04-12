// HELPERS:

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