'use strict';

angular
    .module('meeting')
    .controller('MeetingTasksCtrl', MeetingTasksCtrl);

MeetingTasksCtrl.$inject = ['$state', 'MeetingTaskService', 'Messages', 'MeetingService', 'UserService'];

function MeetingTasksCtrl($state, MeetingTaskService, Messages, MeetingService, UserService) {
    
    var vm = this;
    vm.taskData = {};
    var user = UserService.user;
    var meetingId = $state.params.meetingId;

    MeetingService.getMeeting(user, $state.params.projectId, meetingId).then(function (meeting) {
        vm.meetingTaskList = meeting.tasks;
    });
   
    vm.addTask = function () {
        MeetingTaskService.createTask(meetingId, vm.taskData).then(function (task) {
            Messages.success('Task created successfuly!');
            vm.meetingTaskList.push(task);
            vm.taskData = {};
        }).catch(function (error) {
            vm.validationErrors = error.data;
            Messages.error('Check input field!');
        });
    }
    
    vm.updateStatus = function (task) {
        MeetingTaskService.updateStatus(meetingId, task.id, task).then(function (task) {
            Messages.success('Task status updated');
        }).catch(function (error) {
            console.log(error.data);
        })
    }
    
    vm.deleteTask = function (task) {
        var index = vm.meetingTaskList.indexOf(task);
        if (index > -1) {
            vm.meetingTaskList.splice(index, 1);
        }
        MeetingTaskService.deleteTask(meetingId, task.id);
    }
    
}