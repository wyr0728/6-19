define(['jquery', 'handlebars'], function ($, Handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function (data) {
            var text = $('.hanb').html();
            var compile = Handlebars.compile(text);
            Handlebars.registerHelper('sort', function (items) {
                return items + 1;
            });
            $('.list').html(compile(data));
        }
    });
    // new BScroll('.section-main')
});