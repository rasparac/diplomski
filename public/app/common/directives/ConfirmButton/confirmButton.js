'use strict';

angular
    .module('di.confirmPopUp', [])
    .directive('afterConfirmation', confirmPopUp);
    
function confirmPopUp() {
    var directive = {
        restrict: 'A',
        link: link
    }

    function link(scope, elem, attrs) {
        elem.bind('click', function (e) {
            var msg = attrs.confirmMessage;
            if (msg && confirm(msg)) {
                scope.$apply(attrs.afterConfirmation);
            }
        });
    }

    return directive;
}

