// the config 
// as well as the option of customising texts and titles across the website
//
var config = {
	// mandatory fields - author, experiment_id, description
	"author": "Stela",
	"experiment_id": "test-spr-003",
	"description": "Self-paced reading",
	"liveExperiment": false,

	"contact_email": "stella.plamenova@gmail.com",
	// submission settings
	// set "is_MTurk" to true if the experiment is run in MTurk
	"is_MTurk": true,
	// mturk's HIT submission url
	// specify the submission url if "is_MTurk" is set to true otherwise leave blank
	// the url for the sandbox and the live experiments are different (https://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkAPI/ApiReference_ExternalQuestionArticle.html)
	"MTurk_server": "https://www.mturk.com/mturk/externalSubmit",

	// experiment settings
	"expSettings": {
		// set "hideImage" to true if the image should dissapear
		"hideImage": true,
		// for how long the image is shown before it dissapears in ms (1000 ms = 1 sec)
		// needed if "hideImage" is set to true
		"showDuration": 1000,
		// set to true to make the the sentence underline one continous line or to false to make the words separated by spaces
		"underlineOneLine": false,
		// blank screen before the image and sentence underline shows
		// set to 0 if there shouldn't be a pause
		"pause": 1000,
		"helpText": "Press the SPACE bar to reveal the words"
	},

	// intro view
	"intro": {
		// introduction title
		"title": "Welcome to XPrag experiments!",
		// logo
		"logo": "images/xprag-logo.png",
		// introduction text
		"text": "Lorem ipsum dolor sit amet consectetur adipiscing elit tellus auctor, risus metus mauris nibh leo senectus varius taciti bibendum, laoreet tempor orci ligula iaculis odio malesuada nostra. Erat gravida consequat nunc pharetra libero tempus lobortis placerat, laoreet vitae eget vivamus eros luctus sed nullam auctor, vel sem hac quam facilisis aptent blandit. Bibendum molestie morbi ullamcorper vitae accumsan dapibus ultricies aliquet mi luctus, ante suscipit purus consequat nascetur a senectus cras donec.",
		// instroduction's slide proceeding button
		"buttonText": "Start"
	},

	// instructions view
	"instructions": {
		// instruction's title
		"title": "Instructions",
		// instruction's text
		"text": "instructions on how to do the exp",
		// instuction's slide proceeding button text
		"buttonText": "Go to practice trial"
	},

	// practice trial view
	"practice": {
		"title": "Practice Trial"
	},

	// begin experiment view
	"beginExp": {
		"text": "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
	},

	// subject info view
	"subjInfo": {
		"title": "Additional Information",
		"text": "Answering the following questions is optional, but will help us understand your answers.",
		"buttonText": "Continue",
	},

	// thanks view
	"thanks": {
		"message": "Thank you for taking part in this experiment!"
	}
}
