// creates the Introduction view
var initIntroView = function(CT) {
    var view = {};
    view.name = 'intro';
    view.template = $('#intro-view').html();
    $('#main').html(Mustache.render(view.template, {
        title: config_views.intro.title,
        logo: config_views.intro.logo,
        text: config_views.intro.text,
        buttonText: config_views.intro.buttonText
    }));

    showNextView();

    return view;
};