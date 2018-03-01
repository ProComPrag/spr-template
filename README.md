# A template for creating self-paced reading (spr) experiments

An example of a self paced reading experiment can be found: (to be completed).


## Cloning and running the project

```
# cloning
git clone https://github.com/ProComPrag/spr-template

# running
cd spr-template

# open index.html in the browser to see the experiment
```


## Dependencies

The template uses [jQuery](https://jquery.com/) and [Mustache templates](https://github.com/janl/mustache.js). The libraries can be found at `libraries/`.



## Files Organisation

+ `index.html`
+ `scripts`/
	+ views.js
	+ exp.js
	+ main.js

+ `styles/styles.css`
+ `config.js`
+ `libraries`
+ README.md
+ LISENCE



## Views

**views sequence:**

Introduction -> Instructions -> Practice trial (multiple) -> Begin Exp -> Trial (multiple) -> Subject Info -> Thanks


1. **Introduction view:**

	+ role: contains general information about the experiment
	+ elements: *title*, *text* and *next button*
	+ code: 
	+ displayed: once
	+ *next button* brings Instructions view


2. **Instruction view:**

	+ role: gives instructions about the experiment
	+ elements: *title*, *text* and *next button*.
	+ code:
	+ displayed: once
	+ *next button* brings Practice Trial view


3. **Practice Trial view:**

	+ role: shows an example/s of trial/s, does not record the reading times and response
	+ elements: *image*, *sentence*, *response buttons*
	+ code: 
	+ displayed: as many times as the number of trials
	+ next: *response buttons* (choosing a response) bring either Practice Trial again or Begin Experiment view


4. **Begin Experiment view:**

	+ role: informs the partipant the real experiment is about to begin
	+ elements: *text* and *next button*
	+ code:
	+ displayed: once
	+ next: *next button* brings Trial view


5. **Trial view:**
	
	+ role: shows a single trial, collects the reading times and response
	+ elements: *progress bar*, *image*, *sentence*, *response buttons*
	+ code: index.html lines ..; js/views.js lines ..
	+ displayed: as many times as the number of trials
	+ next: *response buttons* (choosing a respone) bring either Trial view or Subject Info view


6. **Subject Info view:**

	+ role: contains a questionnaire for collecting extra information about the participant
	+ elements: *question fields*, *next button*
	+ code:
	+ displayed: once
	+ next: *next button* brings Thanks view


7. **Thanks view:**

	+ role: displays a thank you message and makes an ajax request with the results
	+ elements: *text*
	+ code:
	+ displayed: once



## Configuraion

The spr experiment template contains a configuration file (`config.js`) that has several **mandatory fields** (more info below) as well as a small set of experiment settings.


### **Mandatory Fields**

The following fileds need to be filled so that the submission to the server works (config.js lines 6-18)

1. **"author"**: string; the name of author of the experiment.

2. **"experiment_id"**: string; the id of the experiment (note: if the same id is used more than once, the new results are appended).

3. **"description"**: string; a short description of the experiment.

4. **"liveExperiment"**: boolean; set to `true` if the experiment is running with real participants and to `false` if the experimenter is testing on their own machine before posting the experiment. When set to `false`, the results that would have been submitted to the server are shown on the last template.

5. **"contact_email"**: string; the email of the experiment's author.

6. **"is_MTurk"**: boolean; set to `true` if the experiment is posted on Mechanical Turk (MTurk) so that the results are submitted to MTurk's servers as well and `false` otherwise.

7. **"MTurk_server"**: string; the MTurk's submission url, check the [MTurk's docs](https://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkAPI/ApiReference_ExternalQuestionArticle.html) section "Form Action" for more information.


### **"Experiment Settings Fields"**

(config.js lines 21-32)

+ **"hideImage"**: boolean; when set to `true` the trial image disappears from the screen after some amount of time ("showDuration" needs to be given a value). If set to `false` the image stays on the screen the whole time.

+ **"showDuration"**: number; the time in milliseconds the trial image stays on the screen before disappearing ("hideImage" needs to be set to `true`).

+ **"underlineOneLine"**: boolean; when set to `true` the trial sentence is one continous line, when set to `false` each word of the trial sentence has a separate underline below it.

+ **"pause"**: number; the duration (in milliseconds) of a blank screen with a cross in the middle before the image and sentence underline show. If set to 0, there will be no blank screens between the trials. 


### **"Text fields"**

The **texts**, **titles** and **button texts** of all the views can be modified (`config.js` lines 34-75).


### Retrieving the results

The results of the experiment can be retrieved from [https://procomprag.herokuapp.com/]https://procomprag.herokuapp.com/
