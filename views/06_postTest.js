// creates Subject Info View
var initPostTestView = function(CT) {
    var view = {};
    view.name = 'postTest';
    view.template = $('#post-test-view').html();
    $('#main').html(Mustache.render(view.template, {
        title: config_views.postTest.title,
        text: config_views.postTest.text
    }));

   $('#next').on('click', function(e) {
        // prevents the form from submitting
        e.preventDefault();
        // records the post test replies
        exp.data.out.age = $('#age').val(),
        exp.data.out.gender = $('#gender').val(),
        exp.data.out.education = $('#education').val(),
        exp.data.out.languages = $('#languages').val(),
        exp.data.out.comments = $('#comments').val().trim()
        // moves to the next view
        exp.findNextView();
   });

    return view;
};