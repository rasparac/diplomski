'use strict';

angular
    .module('userService', [])
    .factory('UserService', UserService);

    UserService.$inject = ['Restangular', 'Messages', '$q'];

function UserService(Restangular, Messages, $q) {

    var service = {
        getUser: getUser,
        updateUserProfile: updateUserProfile,
        changeCurrentProject: changeCurrentProject,
        getUserProjects: getUserProjects
    }

    return service;
    
    service.user = null;

    function getUser() {
        return Restangular.one('users').get().then(function(user) {
            service.user = user;
            return user;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function updateUserProfile(user) {
        return user.put().then(function(user) {
            return user;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function getUserProjects(user) {
        return user.all('projects').doGETLIST('all').then(function(projects) {
            return projects;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function changeCurrentProject(user, projectId, showMessage) {
        return user.one('currentProject', projectId).put().then(function(user) {
            service.user.current_project = user.current_project;
            if (showMessage) {
                Messages.success('You switched project successfully!');
            }
        }, function (error) {
            return $q.reject(error);
        });
    }

}
