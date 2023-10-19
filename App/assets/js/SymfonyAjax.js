export default class SymfonyAjax {
    constructor() {
        this.baseUrl = '/api';
        this.STATTUS_CODE_SUCCESS = 1;
        this.STATTUS_CODE_FAIL = -1;
    }

    makeAjaxRequest(config) {
        const defaultConfig = {
            method: 'GET',
            endpoint: '',
            data: null,
            dataType : 'json',
            contentType : 'application/ld+json',
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.error(error);
            },
        };

        const mergedConfig = {...defaultConfig, ...config};
        const {method, endpoint, data, dataType, contentType, success, error} = mergedConfig;

        $.ajax({
            url: `${this.baseUrl}/${endpoint}`,
            type: method,
            data: data,
            dataType: dataType,
            contentType: contentType,
            success: success,
            error: error,
        });
    }
}