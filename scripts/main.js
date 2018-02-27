// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {	
	spr.init();

	// prevent scrolling when space is pressed (firefox does it)
	window.onkeydown = function(e) {
		if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
	};
});

var spr = {};

// spr.findNextView() handles the views
spr.findNextView = function() {
	if (this.view.name === 'intro') {
		this.view = initInstructionsView();
	} else if (this.view.name === 'instructions') {
		this.view = initPracticeView(practice_trials[this.CPT]);
		console.log(practice_trials[this.CPT]);
		this.CPT++;
	} else if (this.view.name === 'practice' && (this.CPT < this.TPT)) {
		this.view = initPracticeView(practice_trials[this.CPT]);
		console.log(practice_trials[this.CPT]);
		this.CPT++;
	} else if (this.view.name === 'practice' && this.CPT === this.TPT) {
		this.view = initBeginExpView();
	} else if (this.view.name === 'beginExp') {
		this.view = initTrialView(this.data.trials[this.CT], this.CT);
		this.CT++;
	} else if (this.view.name === 'trial' && this.CT < this.TT) {
		this.view = initTrialView(this.data.trials[this.CT], this.CT);
		this.CT++;
	} else if (this.view.name === 'trial' && this.CT === this.TT) {
		this.view = initSubjInfoView();
	} else if (this.view.name === 'subjInfo') {
		this.view = initThanksView();
	}
};

spr.init = function() {
	// CPT - current practice trial
	this.CPT = 0;

	// CT - current trial
	this.CT = 0;

	// generates the experiment and assigns it to this.data
	this.data = initExp();

	// generated the view
	this.view = initIntroView();
	
	// to be done: get TT and TPT from the model, this now is a temp solution
	// TPT - total practice trials
	this.TPT = practice_trials.length;

	// TT - total trials
	this.TT = this.data.trials.length;
};