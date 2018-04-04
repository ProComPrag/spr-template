// initExp() creates and returns an object ('data') where the experiment's info is stored.
// data.trials - a list of objects containing the trial info that is needed for each slide
// of the experiment.
var initExp = function() {
	var data = {};

	trials_raw = [
		{"sentence": "Most of the balls are black in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "Some of the balls are white in the picture"},
		{"sentence": "All of the balls are black in the picture"},
		{"sentence": "All of the balls are black in the picture"},
		{"sentence": "None of the balls are black in the picture"},
		{"sentence": "None of the balls are black in the picture"},
		{"sentence": "Most of the balls are white in the picture"},
		{"sentence": "None of the balls are black in the picture"}
	];


	// function that shuffles the items in a list
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		}

		return comb;
	};

	// each time initExp() is called, items in data.trials are shuffled
	data.trials = shuffleComb(trials_raw);
	data.practice_trials = [
		{"sentence": "Most of the balls are white in the picture"},
		{"sentence": "All of the balls are black in the picture"}
	];
	data.out = [];

	return data;
};
