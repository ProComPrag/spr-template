var config_general = {

    // obligatory settings for any experiment
    'viewFunctions': [
              'initIntroView',
              'initInstructionsView',
              'initPracticeView',
              'initBeginExpView',
              'initTrialView',
              'initPostTestView',
              'initThanksView'
              ], // the order in which views are shown during the experiment
    // 'viewSteps': [1,1,2,1,10,1,1], // how many steps (slides/trials/...) belong to each view
    'viewSteps': [1,1,2,1,10,1,1], // how many steps (slides/trials/...) belong to each view


    // experiment settings
    'expSettings': {
      // set "hideImage" to true if the image should dissapear
      "hideImage": true,
      // for how long the image is shown before it dissapears in ms (1000 ms = 1 sec)
      // needed if "hideImage" is set to true
      "showDuration": 1000,
      // set to true to make the the sentence underline one continous line or to false to make the words separated by spaces
      "underlineOneLine": false,
      // blank screen before the image and sentence underline shows
      // set to 0 if there wouldn't be a pause
      "pause": 500,
      // how long the cross appears before the image
      "crossDuration": 500,
      // help text that appears after the image hides
      "helpText": "Press the SPACE bar to reveal the words"
  }
};