'use strict';

angular
    .module('projectService', [])
    .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['Restangular', 'Messages', '$q'];

function ProjectService(Restangular, Messages, $q) {

    var service = {
        createProject: createProject,
        updateProject: updateProject,
        getProject: getProject,
        deleteProject: deleteProject
    }

    return service;

    function createProject(user, data) {
        return user.all('projects').post(data).then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function updateProject(project, data) {
        return project.put().then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function getProject(projectId) {
        return Restangular.one('projects', projectId).get().then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function deleteProject(project) {
        return project.remove();
    }

}
