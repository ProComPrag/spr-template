// creates Subject Info View
var initPostTestView = function(CT) {
    var view = {};
    view.name = 'subjInfo';
    view.template = $('#subj-info-view').html();
    $('#main').html(Mustache.render(view.template, {
        title: config_views.subjInfo.title,
        text: config_views.subjInfo.text,
        buttonText: config_views.subjInfo.buttonText
    }));

    showNextView();

    return view;
};