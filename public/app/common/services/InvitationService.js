'use strict';

angular
    .module('invitationService', [])
    .factory('InvitationService', InvitationService);
    
InvitationService.$inject = ['$q'];

function InvitationService($q) {
    
    var service = {
        sendInvitation: sendInvitation,
        getUnAcceptedInvitations: getUnAcceptedInvitations,
        acceptInvitation: acceptInvitation
    }
    
    return service;
    
    function getUnAcceptedInvitations(user) {
        return user.doGETLIST('getProjectInvitations').then(function(invitations) {
             return invitations;
        });
    }
    
    function sendInvitation(user, projectId, data) {
        return user.doPOST(data, 'sendInvitation', { project_id: projectId }).then(function(response) {
            return response;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
    function acceptInvitation(user, invitation) {
        return user.one('acceptInvitation', invitation.id).doPUT().then(function(project) {
            return project;
        }, function (error) {
            return $q.resolve(error);
        });
    }
    
}