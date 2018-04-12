// creates Instruction view
var initInstructionsView = function(CT) {
    var view = {};
    view.name = 'instructions';
    view.template = $("#instructions-view").html();
    $('#main').html(Mustache.render(view.template, {
        title: config_views.instructions.title,
        text: config_views.instructions.text,
        button: config_views.instructions.buttonText
    }));

    $('#next').on('click', function() {
        exp.findNextView(); 
    });

    return view;
};