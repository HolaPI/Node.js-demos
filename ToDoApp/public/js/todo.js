$(document).ready(function () {
    $('input').focus();
    listEmpty();
    $('header').on('submit', function () {
        //get value from input frame
        var content = $('form input');
        var randNum = Math.random().toString(16).slice(2, 12);
        var todo = {
            content: content.val(),
            randNum: randNum
        };
        if (todo.content == '') {
            alert('Sorry, but you have type something first!');
            return;
        }
        //send data request
        $.ajax({
            type: 'POST',
            url: '/todo' + 'todo',
            data: todo,
            success: function () {
                // alert("Congras, your task has been added!")
                // console.log(data);
            }
        });
    })
    //delete data request
    $('.delete').on('click', function () {
        var context = $.trim($(this).parent().parent().text());
        var randNum = $(this).parent().parent().attr('data-randNum');
        //NOTE: if content contains english mark?, # or %, it can not be 
        // deleted directly, it should be encoded
        $.ajax({
            type: 'DELETE',
            url: '/todo' + encodeURIComponent(context) + randNum,
            success: function (data) {
                location.reload();
            }
        });
    });
    $('#todo button.complete').click(function () {
        statusCheck($(this), 'completed');
        listEmpty();
    });
    $('#completed button.complete').click(function () {
        statusCheck($(this), 'todo');
        listEmpty();
    });
});
function listEmpty() {
    var todoNum = $('#todo').children().length;
    var doneNum = $('#completed').children().length;
    if (todoNum == 0) {
        $('#todo').text('')
    }
    if (doneNum == 0) {
        $('#completed').text('')
    }
}
function statusCheck(self, marker) {
    var li = self.parent().parent()
    var context = $.trim($(li).text())
    var randNum = $(li).attr('data-randNum');
    var data = {
        content: context,
        randNum: randNum
    };
    $.ajax({
        type: "POST",
        url: '/todo' + marker,
        data: data,
        success: function () {
            location.reload();
        }
    });
}



