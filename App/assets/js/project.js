import SymfonyAjax from "./SymfonyAjax";

$(document).ready(function () {
    const api = new SymfonyAjax();

    api.makeAjaxRequest({
        method: 'GET',
        endpoint: 'tasks',
        success: function(data) {
            if(data.code === api.STATTUS_CODE_SUCCESS) {
                $.each(data.data['hydra:member'], function(index, item) {
                    addRow(item)
                    $('.actions').off('click').on('click', function() {
                        switch ($(this).data('action')) {
                            case 'delete':
                                deleteTask($(this).data('id'))
                                break;
                            case 'edit':
                                console.log('edit' + $(this).data('id'));
                                break;
                            default:
                                window.location.href = 'task/' +  $(this).data('id');
                        }
                    });
                });
            } else {
                //throw error
            }
        }
    });

    $('#add-task').on('click', function() {
        $("#create-edit-task").modal('show');
    });

    function addRow(data) {
        let row = $('<tr>').attr("data-id", data.id);
        $('<td>').text(data.id).appendTo(row);
        $('<td>').text(data.title).appendTo(row);
        $('<td>').text(data.status).appendTo(row);
        $('<td>').text(data.duration ?? '-').appendTo(row);
        $('<td>').html(generateActions(data)).appendTo(row);
        row.appendTo('#tasks tbody');
    }

    function deleteTask(id) {
        api.makeAjaxRequest({
            method: 'DELETE',
            endpoint: 'tasks/' + id,
            success: function(data) {
                if(data.code === api.STATTUS_CODE_SUCCESS) {
                    $('#tasks tr[data-id="'+ id +'"]').remove();
                } else {
                    //throw error
                }
            }
        });
    }

    function generateActions(item) {
        let buttons = '',
         labels = ['e','d'],
         colors = ['info','danger'],
         actions = ['edit','delete'];
        for (let i = 0; i < 2; i++) {
            buttons += "<button data-action='"+ actions[i] +"' data-id='"+ item.id +"' class='btn btn-"+ colors[i] +" btn-sm mx-1 actions'>" + labels[i] + '</button>';
        }
        return buttons;
    }
});