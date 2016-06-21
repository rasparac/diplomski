'use strict';

angular
    .module('project')
    .controller('ProjectTimelineCtrl', ProjectTimelineCtrl);
    
ProjectTimelineCtrl.$inject = ['UserService', '$modal'];

function ProjectTimelineCtrl(UserService, $modal) {
    
    var vm = this;
    var user = UserService.user;
    vm.project = user.current_project;
    
    user.one('projects', vm.project.id).doGETLIST('allMeetings').then(function(meetings) {
        vm.meetings = meetings;
        vm.events = vm.meetings;
    });
    
    var eventModal = $modal({
        controller: 'ProjectTimelineCtrl as timeline',
        templateUrl: '/app/project/modals/newEvent.html',
        show: false
    });
    
    vm.showEventModal = function () {
        eventModal.$promise.then(eventModal.show);
    }
    
    vm.createPhase = function () {
        
    }
    
    /*vm.events = [{
    badgeClass: 'info',
    badgeIconClass: 'glyphicon-check',
    title: 'First heading',
    content: 'Some awesome content.'
  }, {
    badgeClass: 'warning',
    badgeIconClass: 'glyphicon-credit-card',
    title: 'Second heading',
    content: 'More awesome content.'
        },
    {
    badgeClass: 'info',
    badgeIconClass: 'glyphicon-check',
    title: 'First heading',
    content: 'Some awesome content.'
  }];*/
    
}