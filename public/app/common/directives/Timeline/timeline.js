'use strict';

angular
    .module('di.ui')
    .directive('customTimeline', customTimeline);

function customTimeline() {
    var directive = {
        restrict: 'E',
        link: link,
        replace:true,
        scope: {
            timelineData: '=',
            project: '=',
            dateFormat: '@?',
            state: '@'
        },
        templateUrl: 'app/common/directives/Timeline/timeline.html',
    }

    function link(scope, elem, attr) {

    }    

    return directive;
    
}