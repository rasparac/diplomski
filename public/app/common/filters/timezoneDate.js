'use strict';

angular
    .module('di.filters')
    .filter('timezoneDate', function() {
        return function(date, format) {
            date = moment.utc(date).toDate();
            date = moment(date).format(format);

            return date;
        }
    });