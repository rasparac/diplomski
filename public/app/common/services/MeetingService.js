'use strict';

angular
    .module('meetingService', [])
    .factory('MeetingService', MeetingService)

MeetingService.$inject = ['$q'];

function MeetingService($q) {
    
    var service = {
        createMeeting: createMeeting,
        getMeeting: getMeeting,
        updateMeeting: updateMeeting
    }
    
    return service;
    
    function createMeeting(user, projectId, data) {
        return user.one('projects', projectId).all('meetings').post(data).then(function (meeting) {
            return meeting;
        }, function(error) {
            return $q.reject(error);
        });
    }
    
    function getMeeting(user, projectId, meetingId) {
        return user.one('projects', projectId).one('meetings', meetingId).get().then(function (meeting) {
            return meeting;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
    function updateMeeting(user, projectId, meetingId, data) {
        return user.one('projects', projectId).one('meetings', meetingId).doPUT(data).then(function (meeting) {
            return meeting;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
}