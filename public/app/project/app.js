'use strict';

angular
    .module('project', ['restangular', 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('di.main.project', {
                url: 'users/:userId/projects',
                abstract: true,
                templateUrl: 'app/project/views/project.html'
            })
            .state('di.main.project.timeline', {
                url: '/:projectId/timeline',
                templateUrl: 'app/project/views/projectTimeline.html',
                controller: 'ProjectTimelineCtrl',
                controllerAs: 'timeline'
            })
            .state('di.main.project.new', {
                url: '/new',
                templateUrl: 'app/project/views/newProject.html',
                controller: 'CreateProjectCtrl',
                controllerAs: 'createProject'
            })
            .state('di.main.project.list', {
                url: '/list',
                templateUrl: 'app/project/views/projectsList.html',
                controller: 'ProjectsListCtrl',
                controllerAs: 'projectsList'
            })
            .state('di.main.project.settings', {
                url: '/:projectId/settings',
                templateUrl: 'app/project/views/projectSettings.html',
                controller: 'ProjectSettingsCtrl',
                controllerAs: 'projectSettings'
            })
            .state('di.main.project.settings.invite', {
                templateUrl: 'app/project/views/inviteUser.html',
                controller: 'ProjectInviteCtrl',
                controllerAs: 'invite'
            })
            .state('di.main.project.settings.upload', {
                templateUrl: 'app/project/views/uploadFiles.html',
                controller: 'ProjectUploadCtrl',
                controllerAs: 'upload'
            })
            .state('di.main.project.settings.uploadedFiles', {
                templateUrl: 'app/project/views/uploadedFiles.html',
                controller: 'ProjectFilesCtrl',
                controllerAs: 'files'
            });
    });
