'use strict';

angular
    .module('project')
    .controller('CreateProjectCtrl', CreateProjectCtrl);

CreateProjectCtrl.$inject = ['ProjectService', '$state', 'Messages', 'UserService'];

function CreateProjectCtrl(ProjectService, $state, Messages, UserService) {

    var vm = this;
    vm.projectData = {};
    vm.user = UserService.user;
    vm.minDate = moment().subtract(1, 'd');

    vm.createProject = function() {
        vm.projectData.created_by = vm.user.email;
        ProjectService.createProject(vm.user, vm.projectData).then(function(project) {
            vm.user.projects.push(project);
            UserService.changeCurrentProject(vm.user, project.id).then(function() {
                $state.go('di.main.home');
                Messages.success('Your project is created successfully');
            });
        }).catch(function(error) {
            vm.validationErrors = error.data;
            Messages.error("Check required fields!");
        });
    }
}
