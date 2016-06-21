'use strict';

angular
    .module('projectPhaseService', [])
    .factory('ProjectPhaseService', ProjectPhaseService)

ProjectPhaseService.$inject = ['$q', 'Restangular'];

function ProjectPhaseService($q, Restangular) {
    var service = {
        createPhase: createPhase,
        getPhaseMeetings: getPhaseMeetings
    }

    function createPhase(user, projectId, data) {
        return user.one('projects', projectId).all('phases').post(data).then(function(projectPhase) {
            return projectPhase;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function getPhaseMeetings(user, projectId, phaseId) {
        return user.one('projects', projectId).one('phases', phaseId).all('meetings').getList().then(function(meetings) {
            return meetings;
        }, function(error) {
            return $q.reject(error);
        });
    }

    return service;
}