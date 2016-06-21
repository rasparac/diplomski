'use strict';

angular
    .module('di.messages', [])
    .factory('Messages', Messages);

    Messages.$inject = ['toastr'];

function Messages(toastr) {
    var service = {
        success: success,
        info: info,
        error: error,
        warning: warning
    }

    return service;

    function success(msg, title) {
        title = title || 'Success!';
        toastr.success(msg, title);
    }

    function info(msg, title) {
        title = title || 'Info!';
        toastr.info(msg, title);
    }

    function error(msg, title) {
        title = title || 'Error!';
        toastr.error(msg, title);
    }

    function warning(msg, title) {
        title = title || 'Warning!';
        toastr.warning(msg, title);
    }
}
