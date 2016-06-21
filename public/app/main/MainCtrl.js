'use strict';

angular
    .module('home')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['loggedUser', 'ProjectService', '$state', 'Messages', '$localStorage', 'UserService', 'Restangular', 'InvitationService'];

function MainCtrl(loggedUser, ProjectService, $state, Messages, $localStorage, UserService, Restangular, InvitationService) {

    var vm = this;
    vm.user = UserService.user;
    
    InvitationService.getUnAcceptedInvitations(vm.user).then(function(invitations) {
        vm.invitations = invitations;
    });
    
    vm.acceptInvitation = function(invitation) {
        InvitationService.acceptInvitation(vm.user, invitation).then(function(project) {
            if (!vm.user.current_project) {
                UserService.changeCurrentProject(vm.user, project.id).then(function() {
                    $state.go('di.main.home');
                });
            }
            
            vm.user.projects.push(project);
            var index = vm.invitations.indexOf(invitation);
            if (index > -1) vm.invitations.splice(index, 1);
            Messages.info('Invitation Accepted!');
        });
    }
    
    vm.declineInvitation = function(invitation) {
        
    }

    vm.changeProject = function(project) {
        UserService.changeCurrentProject(vm.user, project.id, true).then(function() {
            $state.go('di.main.home');
        });
    }

    vm.logout = function() {
        Messages.info('Logged out!');
        delete $localStorage.token;
    }

}
