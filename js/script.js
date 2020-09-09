// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3034/todos
// e fare le 4 operazioni Create, Read, Update e Delete.



$(document).ready(function(){

    printList();

    $('.input button').click(function() {

        var valore = $('.input input').val();

        if (valore == '') {
            return;
        }  else {
            addItem(valore);    
        }
    
    })

    $('.input input').keydown(function (e) { 
        if(e.which == 13 || e.keycode == 13) {
            var valore = $('.input input').val();
            if (valore == '') {
                return;
            }  else {
                addItem(valore);    
            }
        }
    });

    $(document).on('click','.item .icon i.delete',function(){

        var idItem = $(this).parent('.icon').parent('.item').data('id');

        removeItem(idItem);

    });

    $(document).on('click','.item .icon i.modify',function(){

        var idItem = $(this).parent('.icon').parent('.item').data('id');

        $('.item[data-id="' + idItem + '"]').find('h3').hide();

        $('.item[data-id="' + idItem + '"]').find('input').show();

    });

    $(document).on('focus','.item input', function(e){

        $(document).on('keydown','.item input', function(e){

            var idItem = $(this).parent('.item').data('id');

            if (e.which == 13 || e.keycode == 13) {
                modifyItem(idItem);
            }

        });

    });

});

// FUNZIONI

function printList() {

    empty();

    $.ajax(
        {
            url: 'http://157.230.17.132:3034/todos',
            methos: 'GET',
            success: function(data) {

                var source = $('#template').html();
                var template = Handlebars.compile(source);

                for (let i = 0; i < data.length; i++) {

                        var context = {
                            item: data[i].text,
                            id: data[i].id
                        };
                
                        var html = template(context); 
                
                        $('.container').append(html);
            
                }
            },
            error: function() {
                alert('error');
            }
        }
    );

};

function addItem(val) {

    $.ajax(
        {
            url: 'http://157.230.17.132:3034/todos',
            method: 'POST',
            data: {
                text: val
            },
            success: function(data) {

                printList();

            },
            error: function() {
                alert('error');
            }
        }
    );

};

function removeItem(id) {

    $.ajax(
        {
            url: 'http://157.230.17.132:3034/todos/' + id,
            method: 'DELETE',
            success: function(data) {

                printList();

            },
            error: function() {
                alert('error');
            }
        }
    );

};

function modifyItem(id) {

    var valore = $('.item[data-id="' + id + '"]').find('input').val();

    $.ajax(
        {
            url: 'http://157.230.17.132:3034/todos/' + id,
            method: 'PUT',
            data: {
                text: valore
            },
            success: function(data) {

                printList();

            },
            error: function() {
                alert('error');
            }
        }
    );

    $('.item[data-id="' + id + '"]').find('h3').show();

    $('.item[data-id="' + id + '"]').find('input').hide();

}

function empty() {
    $('.container').empty();
    $('.input input').val('');
}