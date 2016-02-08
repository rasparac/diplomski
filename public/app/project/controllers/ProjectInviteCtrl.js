'use strict';

angular
    .module('project')
    .controller('ProjectInviteCtrl', ProjectInviteCtrl);
    
ProjectInviteCtrl.$inject = ['$state', 'UserService', 'Messages', 'InvitationService'];

function ProjectInviteCtrl($state, UserService, Messages, InvitationService) {
    
    var vm = this;
    vm.invitationData = {};
    
    vm.sendInvitation = function () {
        var user = UserService.user;
        var projectId = $state.params.projectId;
        vm.invitationData.invited_by_username = user.username;
        vm.invitationData.project_name = user.current_project.project_name;

        InvitationService.sendInvitation(user, projectId, vm.invitationData).then(function(response) {
            Messages.info(response.msg);
            vm.invitationData = {};
        }).catch(function (error) {
            if (error.status != 422) {
                Messages.error("User with that E-mail does not exists!");
            } else {
                Messages.error("Check E-Mail input!");
            }
            vm.validationErrors = error.data;
        });
    }
    
}    