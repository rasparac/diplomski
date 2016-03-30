'use strict';

angular
    .module('projectPhase')
    .controller('CreatePhaseCtrl', CreatePhaseCtrl);

CreatePhaseCtrl.$inject = ['ProjectPhaseService', 'UserService']

function CreatePhaseCtrl(ProjectPhaseService, UserService) {

    var vm = this;
    var user = UserService.user;
    vm.phaseData = {}
    vm.minStartDate = moment().subtract(1, 'd');
    vm.disableBtn = false;

    vm.createPhase = function() {
        vm.disableBtn = true;
        ProjectPhaseService.createPhase(user, user.current_project.id, vm.phaseData).then(function(projectPhase) {
            vm.phaseData = projectPhase;
        }).catch(function(error) {
            vm.validationErrors = error.data;
        }).finally(function() {
            vm.disableBtn = false;
        })
    }
}