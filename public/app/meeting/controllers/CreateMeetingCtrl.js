'use strict';

angular
    .module('meeting')
    .controller('CreateMeetingCtrl', CreateMeetingCtrl);

CreateMeetingCtrl.$inject = ['UserService', 'MeetingService', 'Messages', '$state'];
    
function CreateMeetingCtrl(Userservice, MeetingService, Messages, $state) {
    
    var vm = this;
    vm.meetingData = {};
    var user = Userservice.user;    

    user.one('projects', user.current_project.id).doGETLIST('project-phases').then(function (phases) {
        vm.phasesList = _.map(phases, function(phase) {
            return {
                id: phase.id,
                name: phase.title
            }
        })
    });    
    
    vm.createMeeting = function () {
        var projectId = user.current_project.id;

        if (vm.meeting === 1) {
            vm.meetingData.project_phase_id = null;
        }

        MeetingService.createMeeting(user, projectId, vm.meetingData).then(function (meeting) {
            $state.transitionTo('di.main.project.settings', { userId: user.id, projectId: projectId });
            Messages.success('Meeting created successfully!');
        }).catch(function (error) {
            vm.validationErrors = error.data;
            Messages.error('Check input fields!');
        });
    }
    
}