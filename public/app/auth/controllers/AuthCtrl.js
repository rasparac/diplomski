'use strict';

angular
    .module('auth')
    .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$scope', 'Restangular', '$localStorage', '$state', '$location', 'Messages'];

function AuthCtrl($scope, Restangular, $localStorage, $state, $location, Messages) {

    var vm = this;

    vm.loginData = {};
    vm.registrationData = {};

    vm.login = function() {
        Restangular.all('login').post(vm.loginData).then(function(res) {
            $localStorage.token = res.token;
            $state.transitionTo('di.main.home');
        }, function(error) {
            console.log(error);
            Messages.warning("Invalid credentials!");
        });
    }

    vm.registration = function() {
        Restangular.all('registration').post(vm.registrationData).then(function(res) {
            $state.transitionTo('login');
        }, function(error) {
            vm.validationErrors = error.data;
            Messages.error("Check required fields!");
        })
    }

}
