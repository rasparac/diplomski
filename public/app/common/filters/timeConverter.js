'use strict';

angular
    .module('di.filters', [])
    .filter('millSecondsToTimeString', function () {
        return function (miliseconds) {
            if (miliseconds) {
                var seconds = Math.floor(miliseconds / 1000);
                var hours = Math.floor((seconds % 86400) / 3600);
                var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
                var HH = hours < 10 ? '0' + hours : hours;
                var MM = minutes < 10 ? '0' + minutes : minutes;

                return HH + ':' + MM + ' h';
            }
            return '-:-';
        }
    });