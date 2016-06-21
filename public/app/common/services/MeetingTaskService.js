'use strict';

angular
    .module('meetingTaskService', [])
    .factory('MeetingTaskService', MeetingTaskService)

MeetingTaskService.$inject = ['$q', 'Restangular'];


function MeetingTaskService($q, Restangular) {
    
    var service = {
        createTask: createTask,
        updateStatus: updateStatus,
        deleteTask: deleteTask
    }
    
    return service;
    
    function createTask(meetingId, data) {
        return Restangular.one('meetings', meetingId).one('tasks').doPOST(data).then(function (task) {
            return task;
        }, function (error) {
            return $q.reject(error);    
        });
    }
    
    function updateStatus(meetingId, taskId, data) {
        return Restangular.one('meetings', meetingId).one('tasks', taskId).doPUT(data).then(function (task) {
            return task;
        }, function (error) {
            return $q.reject(error);    
        });
    }
    
    function deleteTask(meetingId, taskId) {
        return Restangular.one('meetings', meetingId).one('tasks', taskId).remove();
    }
    
}