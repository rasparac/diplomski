'use strict';

angular
    .module('meeting')
    .controller('MeetingTimelineCtrl', MeetingTimelineCtrl);

MeetingTimelineCtrl.$inject = ['$state', 'UserService', 'MeetingService', '$filter'];

function MeetingTimelineCtrl($state, UserService, MeetingService, $filter) {
    
    var vm = this;
    var user = UserService.user;
    vm.project = user.current_project;
    
    user.one('projects', vm.project.id).doGETLIST('allMeetings').then(function (meetings) {
        vm.meetings = meetings;
        _.filter(vm.meetings, function (meeting) {
            meeting.finishedTasks = _.filter(meeting.tasks, function (task) {
                return task.status == true
            }).length;
        });
    });
    
}