// creates Begin experiment view
var initBeginExpView = function(CT) {
    var view = {};
    view.name = 'beginExp';
    view.template = $('#begin-exp-view').html();
    $('#main').html(Mustache.render(view.template, {
        text: config_views.beginExp.text
    }));

    showNextView();

    return view;
};