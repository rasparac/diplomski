'use strict';

angular
    .module('meeting')
    .controller('MeetingTimelineCtrl', MeetingTimelineCtrl);

MeetingTimelineCtrl.$inject = ['$state', 'UserService', 'MeetingService', 'ProjectPhaseService'];

function MeetingTimelineCtrl($state, UserService, MeetingService, ProjectPhaseService) {
    
    var vm = this;
    var user = UserService.user;
    vm.project = user.current_project;

    getAllMeetings();

    user.one('projects', user.current_project.id).doGETLIST('project-phases').then(function(phases) {
        vm.phasesList = _.map(phases, function(phase) {
            return {
                id: phase.id,
                name: phase.title
            }
        })
    });

    vm.getPhaseMeetings = function(phase) {
        if (!phase) {
            getAllMeetings();
        } else {
            ProjectPhaseService.getPhaseMeetings(user, vm.project.id, phase.id).then(function(meetings) {
                vm.meetings = meetings
                getFinishedTasks(vm.meetings);
            })
        }
    }

    function getAllMeetings() {
        user.one('projects', vm.project.id).doGETLIST('allMeetings').then(function (meetings) {
            vm.meetings = meetings;
            getFinishedTasks(vm.meetings);
        });
    }

    function getFinishedTasks(meetings) {
        _.forEach(meetings, function(meeting) {
            meeting.finishedTasks = _.filter(meeting.tasks, function(task) {
                return task.status == true
            }).length;
        });
    }
    
}