'use strict';

angular
    .module('di',
    ['restangular', 'ui.router', 'di.ui', 'main', 'ngStorage', 'auth', 'home', 'project', 'ui.bootstrap',
    'mgcrea.ngStrap', 'profile', 'di.messages', 'userService', 'projectService', 'ngFileUpload', 'ngImgCrop', 'invitationService',
    'meeting', 'meetingService', 'projectPhase', 'angular-timeline', 'di.filters', 'meetingTaskService', 'di.confirmPopUp'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('di', {
                abstract: true,
                templateUrl: 'app/index.html'
            });

        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('/api/v1');
        RestangularProvider.setDefaultHeaders({});

        $httpProvider.interceptors.push('AuthInterceptor');
    }).
    factory('AuthInterceptor', ['$q', '$localStorage', '$location', function($q, $localStorage, $location) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    delete $localStorage.token;
                    $location.path('/login');
                }
                return $q.reject(response);
            },
            response: function(response) {
                return response;
            }
        };
    }])
    .run(function($rootScope, $state, $stateParams, $localStorage, $location, toastrConfig) {
        $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            if ($localStorage.token && toState.url == '/login') {
                $location.path(fromState.url);
            }
            if (toState.url == '/' && $localStorage.token != null) {
                //delete $localStorage.token;
                $location.path('/home');
            }
            if (toState.url != '/login' && toState.url != '/registration') {
                if ($localStorage.token == null) {
                    $location.path('/login');
                }
            }
        });

        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            closeButton: true,
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventOpenDuplicates: true,
            target: 'body'
        });
    });
