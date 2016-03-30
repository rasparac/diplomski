/* global _ */
'use strict';

angular
    .module('project')
    .controller('ProjectsListCtrl', ProjectsListCtrl);

    ProjectsListCtrl.$inject = ['loggedUser', 'UserService', 'ProjectService', '$scope', '$state', 'Messages'];

function ProjectsListCtrl(loggedUser, UserService, ProjectService, $scope, $state, Messages) {

    var vm = this;
    vm.user = UserService.user;

    UserService.getUserProjects(loggedUser).then(function(projects) {
        vm.projects = projects;
        var sum = 0;
        
        _.forEach(vm.projects, function (project) {
            _.forEach(project.meetings, function (meeting) {
                 sum += Math.abs(new Date(meeting.end_date) - new Date(meeting.start_date));
                 project['meeting_hours'] = sum;
            });
            sum = 0;
        });
    })

    vm.deleteProject = function(project) {
        var isCurrent = vm.user.current_project.id == project.id;

        ProjectService.deleteProject(project).then(function(response) {
            var index = vm.projects.indexOf(project);
            if (index > -1) {
                vm.projects.splice(index, 1);
                UserService.user.projects.splice(index, 1);
                if (UserService.user.projects.length == 0) {
                    UserService.user.current_project = null;
                }
            }

            if (isCurrent && vm.projects.length > 0) {
                UserService.changeCurrentProject(vm.user, vm.projects[0].id).then(function() {
                    return;
                });
            }
            
            Messages.info(response.success);              
        }, function(error) {
            Messages.error(error.data)
        })
    }

}
