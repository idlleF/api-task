import SymfonyAjax from "./SymfonyAjax";

$(document).ready(function () {
    const api = new SymfonyAjax();

    api.makeAjaxRequest({
        method: 'GET',
        endpoint: 'projects',
        success: function(data) {
            if(data.code === api.STATTUS_CODE_SUCCESS) {
                $.each(data.data['hydra:member'], function(index, item) {
                    addRow(item)

                    $('.actions').off('click').on('click', function() {
                        switch ($(this).data('action')) {
                            case 'delete':
                                deleteProject($(this).data('id'))
                                break;
                            case 'edit':
                                console.log('edit' + $(this).data('id'));
                                break;
                            default:
                                window.location.href = 'project/' +  $(this).data('id');
                        }
                    });
                });
            } else {
                //throw error
            }
        }
    });

    $('#add').on('click', function() {
        $("#create-edit-project").modal('show');
    });

    function addRow(data) {
        let row = $('<tr>').attr("data-id", data.id);
        $('<td>').text(data.id).appendTo(row);
        $('<td>').text(data.title).appendTo(row);
        $('<td>').text(data.status).appendTo(row);
        $('<td>').text(data.duration ?? '-').appendTo(row);
        $('<td>').html(generateActions(data)).appendTo(row);
        row.appendTo('#projects tbody');
    }

    function deleteProject(id) {
        api.makeAjaxRequest({
            method: 'DELETE',
            endpoint: 'projects/' + id,
            success: function(data) {
                if(data.code === api.STATTUS_CODE_SUCCESS) {
                    $('#projects tr[data-id="'+ id +'"]').remove();
                } else {
                    //throw error
                }
            }
        });
    }

    function generateActions(item) {
        let buttons = '',
         labels = ['v','e','d'],
         colors = ['primary','info','danger'],
         actions = ['view','edit','delete'];
        for (let i = 0; i < 3; i++) {
            buttons += "<button data-action='"+ actions[i] +"' data-id='"+ item.id +"' class='btn btn-"+ colors[i] +" btn-sm mx-1 actions'>" + labels[i] + '</button>';
        }
        return buttons;
    }
});