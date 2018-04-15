// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();

    if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
        // updates the fields in the hidden form with info for the MTurk's server
        $('#main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
        }));
    } else if (config_deploy.deployMethod === 'Prolific') {
        var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
        }));
    } else if (config_deploy.deployMethod === 'debug') {
        $('main').html(Mustache.render(view.template, {}));
    } else {
        console.log('no such config_deploy.deployMethod');
    }

    exp.submit();

    return view;
};