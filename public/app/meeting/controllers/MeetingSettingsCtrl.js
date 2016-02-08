'use strict';

angular
    .module('meeting')
    .controller('MeetingSettingsCtrl', MeetingSettingsCtrl);

MeetingSettingsCtrl.$inject = ['$state', 'UserService', 'MeetingService'];

function MeetingSettingsCtrl($state, UserService, MeetingService) {
    
    var vm = this;
    var user = UserService.user;
    var meetingId = $state.params.meetingId;
    
    MeetingService.getMeeting(user, user.current_project.id, meetingId).then(function (meeting) {
        vm.meeting = meeting;
    })
    
    vm.updateMeeting = function () {
        MeetingService.updateMeeting(user, user.current_project.id, meetingId, vm.meeting).then(function (meeting) {
            vm.meeting = meeting;
        }).catch(function (error) {

        });
    }
    
}