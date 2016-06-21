'use strict';

angular
    .module('projectPhase', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('di.main.phase', {
                url: 'users/:userId/projects/:projectId/phases',
                templateUrl: 'app/projectPhase/views/projectPhase.html',
                abstract: true,
            })
            .state('di.main.phase.new', {
                url: '/new',
                templateUrl: 'app/projectPhase/views/newPhase.html',
                controller: 'CreatePhaseCtrl',
                controllerAs: 'createPhase'
            })
            .state('di.main.phase.timeline', {
                url: '/phase-timeline',
                templateUrl: 'app/projectPhase/views/phaseTimeline.html',
                controller: 'PhaseTimelineCtrl',
                controllerAs: 'phaseTimeline'
            })
    });