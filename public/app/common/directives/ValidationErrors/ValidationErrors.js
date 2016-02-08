'use strict';

angular
    .module('di.ui', [])
    .directive('validationErrors', validationErrors);

function validationErrors() {
    return {
        restrict: 'E',
        scope: {
            errorMessages: '=?'
        },
        templateUrl: 'app/common/directives/ValidationErrors/ValidationErrors.html',
        replace: true
    }

    return directive;
}
