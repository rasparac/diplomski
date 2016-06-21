'use strict';

angular
    .module('profile', ['restangular', 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider
        .state('di.main.profile', {
            url: 'users/:id/user-profile',
            templateUrl: 'app/user/views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile'
        })
    });
