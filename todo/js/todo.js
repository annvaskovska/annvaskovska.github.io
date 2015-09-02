$(document).ready(function() {
    var save = save || {};
    (function(s) {
        s.toLocalStore = function() {
            $(document).ready(function() {

                var myJsonString = '[';

                var tasks = document.getElementsByClassName("task");

                for (var i = 0; i < tasks.length; i++) {
                    var check = tasks[i].getElementsByTagName('input')[0]
                    var spans = tasks[i].getElementsByTagName("span");
                    myJsonString += '{\"taskNumber\":' + i.toString() + ',\"count\":' + spans.length.toString() + ',\"check\":\"' + check.getAttribute('data-checked').toString() + '\",\"tasks\": {';

                    if (spans.length > 0) {
                        for (var j = 0; j < spans.length; j++) {
                            myJsonString += '\"' + j.toString() + '\":' + spans[j].getAttribute("data-done")
                            if (j != spans.length - 1) myJsonString += ','
                        }
                        myJsonString += '}'
                    }
                    else {
                        myJsonString += '}'
                    }

                    myJsonString += '}'
                    if (i != tasks.length - 1) myJsonString += ','
                }
                myJsonString += ']'

                window.localStorage.setItem('key', myJsonString)

            })
        }
        s.fromLocalStore = function() {


            if (localStorage.getItem('key') != null) {

                var json = JSON.parse(window.localStorage.getItem('key'));

                var tasks = document.getElementsByClassName("task");

                for (var i = 0; i < tasks.length; i++) {

                    var check = tasks[i].getElementsByTagName('input')[0]
                    check.setAttribute('data-checked', json[i].check)

                    var spans = tasks[i].getElementsByTagName("span");
                    if (json[i].count > 0) {
                        for (var j = 0; j < json[i].count; j++) {
                            spans[j].setAttribute('data-done', json[i].tasks[j])
                        }
                    }
                }
            }

        };
    })(save);

    save.fromLocalStore();

    var spans = $('span')
    spans.each(function() {
        if ($(this).attr('data-done') == 'true') {
            $(this).css('text-decoration', 'line-through')
        }
        else if ($(this).attr('data-done') == 'false') {
            $(this).css('text-decoration', 'none')
        }
    })

    var input = $('input[type="checkbox"]')
    input.each(function() {
        if ($(this).attr('data-checked') == 'true') {
            $(this).prop('checked', true)
            $(this).parent().css('background', 'rgba(232, 234, 246, 0.85)')
        }
        else if ($(this).attr('data-checked') == 'fasle') {
            $(this).prop('checked', false)
            $(this).parent().css('background', 'rgba(255,255,255,0.85)')
        }
    })


    $('span').click(function() {
        if ($(this).attr('data-done') == 'true') {
            $(this).css('text-decoration', 'none')
            $(this).attr('data-done', 'false')
        }
        else {
            $(this).css('text-decoration', 'line-through')
            $(this).attr('data-done', 'true')
        }

        var spans = $(this).parent().find('span')
        var flag = true
        spans.each(function() {
            if ($(this).attr('data-done') == 'false') {
                flag = false
                return false
            }
        })

        if (flag) {
            $(this).parent().parent().find('input').attr('data-checked', 'true')
            $(this).parent().parent().find('input').prop('checked', true)
            $(this).parent().parent().css('background', 'rgba(232, 234, 246, 0.85)')
        }
        else {
            $(this).parent().parent().find('input').attr('data-checked', 'false')
            $(this).parent().parent().find('input').prop('checked', false)
            $(this).parent().parent().css('background', 'rgba(255,255,255,0.85)');
        }

        save.toLocalStore();
    });

    $('input[type="checkbox"]').click(function() {
        var spans = $(this).parent().find('span')
        if ($(this).prop("checked") == true) {
            $(this).attr('data-checked', 'true')
            spans.each(function() {
                $(this).css('text-decoration', 'line-through')
                $(this).attr('data-done', 'true')
            })
            $(this).parent().css('background', 'rgba(232, 234, 246, 0.85)')
        }
        else if ($(this).prop("checked") == false) {
            $(this).attr('data-checked', 'fasle')
            spans.each(function() {
                $(this).css('text-decoration', 'none')
                $(this).attr('data-done', 'false')
            });
            $(this).parent().css('background', 'rgba(255,255,255,0.85)')
        }

        save.toLocalStore();
    });

});
