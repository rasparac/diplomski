'use strict';

angular
    .module('auth', ['restangular', 'ui.router', 'ngStorage', 'toastr'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/auth/views/login.html',
                controller: 'AuthCtrl',
                controllerAs: 'auth'
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'app/auth/views/registration.html',
                controller: 'AuthCtrl',
                controllerAs: 'auth'
            });
    });
