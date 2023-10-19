import SymfonyAjax from "./SymfonyAjax";

$(document).ready(function () {
    const api = new SymfonyAjax();

    $('#duration').datepicker();

    $("#create-project").submit(function (event) {
        event.preventDefault();

        let formDataJSON = {};
        $.each($(this).serializeArray(), function() {
            if (this.value.length) {
                formDataJSON[this.name] = this.value;
            }
        });
        console.log(formDataJSON);
        api.makeAjaxRequest({
            method: 'POST',
            endpoint: 'projects',
            data: JSON.stringify(formDataJSON),
            success: function(data) {
                if(data.code === api.STATTUS_CODE_SUCCESS) {
                    //update projects table
                    addListRow(data.data)
                    $("#create-edit-project").modal('hide');
                } else {
                    console.log(data);
                }
            }
        });
    });

    function addListRow(data) {
        let row = $('<tr>');
        $('<td>').text(data.id).appendTo(row);
        $('<td>').text(data.title).appendTo(row);
        $('<td>').text(data.status).appendTo(row);
        $('<td>').text(data.duration ?? '-').appendTo(row);
        $('<td>').html(generateListActions(data)).appendTo(row);
        row.appendTo('#tasks tbody');
    }

    function generateListActions(item) {
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