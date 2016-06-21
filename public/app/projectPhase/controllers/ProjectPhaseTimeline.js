'use strict';

angular
    .module('projectPhase')
    .controller('PhaseTimelineCtrl', PhaseTimelineCtrl);

PhaseTimelineCtrl.$inject = ['UserService'];

function PhaseTimelineCtrl(UserService) {

    var vm = this;
    var user = UserService.user;
    vm.project = user.current_project;

    user.one('projects', vm.project.id).doGETLIST('project-phases').then(function (phases) {
        vm.phases = phases;
    }); 
    
}