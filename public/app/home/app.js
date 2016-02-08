'use strict';

angular
    .module('home', ['restangular', 'ui.router'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('di.main.home', {
                url: 'home',
                templateUrl: 'app/home/views/home.html',
                data: {
                    appName: 'Home'
                }
            })
    });
