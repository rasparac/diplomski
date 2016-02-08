'use strict';

angular
    .module('meeting', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('di.main.meeting', {
                url: 'users/:userId/projects/:projectId/meetings',
                abstract: true,
                templateUrl: 'app/meeting/views/meeting.html'
            })
            .state('di.main.meeting.new', {
                url: '/new',
                templateUrl: 'app/meeting/views/newMeeting.html',
                controller: 'CreateMeetingCtrl',
                controllerAs: 'createMeeting'
            })
            .state('di.main.meeting.settings', {
                url: '/:meetingId/settings',
                templateUrl: 'app/meeting/views/meetingSettings.html',
                controller: 'MeetingSettingsCtrl',
                controllerAs: 'meetingSettings'
            })
            .state('di.main.meeting.settings.tasks', {
                templateUrl: 'app/meeting/views/meetingTasks.html',
                controller: 'MeetingTasksCtrl',
                controllerAs: 'meetingTasks'
            })
            .state('di.main.meeting.settings.taskList', {
                templateUrl: 'app/meeting/views/meetingTasksList.html',
                controller: 'MeetingTasksCtrl',
                controllerAs: 'meetingTasks'
            })
            .state('di.main.meeting.timeline', {
                url: '/timeline',
                templateUrl: 'app/meeting/views/meetingsTimeline.html',
                controller: 'MeetingTimelineCtrl',
                controllerAs: 'meetingTimeline'
            });
    });