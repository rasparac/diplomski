'use strict';

angular
    .module('meeting')
    .controller('CreateMeetingCtrl', CreateMeetingCtrl);

CreateMeetingCtrl.$inject = ['UserService', 'MeetingService', 'Messages', '$state'];
    
function CreateMeetingCtrl(Userservice, MeetingService, Messages, $state) {
    
    var vm = this;
    vm.meetingData = {};
    var user = Userservice.user;
    
    vm.createMeeting = function () {
        var projectId = user.current_project.id;
        MeetingService.createMeeting(user, projectId, vm.meetingData).then(function (meeting) {
            $state.transitionTo('di.main.project.settings', {userId: user.id, projectId: projectId});
            Messages.success('Meeting created successfully!');
        }).catch(function (error) {
            vm.validationErrors = error.data;
            Messages.error('Check input fields!');
        });
    }
    
}