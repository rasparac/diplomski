'use strict';

angular
    .module('main', ['restangular', 'ui.router'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('di.main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                resolve: {
                    loggedUser: function(UserService) {
                        return UserService.getUser();
                    }
                }
            })
    });
