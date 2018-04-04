// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();
    var HITData = getHITData();

    $('#main').html(Mustache.render(view.template, {
        thanksMessage: config_views.thanks.message,
        mturk_server: config_deploy.MTurk_server,
        assignmentId: HITData['assignmentId'],
        author: config_deploy.author,
        experiment_id: config_deploy.experiment_id,
        trials: JSON.stringify(exp.data.trials),
        description: config_deploy.description,
        worker_id: HITData['workerId']
    }));

    var data = {
        'author': config_deploy.author,
        'experiment_id': config_deploy.experiment_id,
        'trials': exp.data.trials,
        'description': config_deploy.description,
        'worker_id': HITData['workerId'],
        // MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
        'assignmentId': HITData['assignmentId'],
        'HIT_id': HITData['hitId']
    };

    // if the experiment is set to live (seenconfig.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are shown on the thanks slide
    if (config.liveExperiment) {
        submitResults(config.is_MTurk, config.contact_email, data);
    } else {
        jQuery('<p/>', {
            text: JSON.stringify(data)
        }).appendTo($('.view'));
    }

    return view;
};