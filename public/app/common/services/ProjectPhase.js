'use strict';

angular
    .module('projectPhaseService', [])
    .factory('ProjectPhaseService', ProjectPhaseService)

ProjectPhaseService.$inject = ['$q', 'Restangular'];

function ProjectPhaseService($q, Restangular) {
    var service = {
        createPhase: createPhase
    }
    
    function createPhase(user, projectId, data) {
        
    }
    
    return service;
}