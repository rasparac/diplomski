'use strict';

angular
    .module('project')
    .controller('ProjectFilesCtrl', ProjectFilesCtrl);

ProjectFilesCtrl.$inject = ['Restangular', 'ProjectService', '$state', '$window'];
    
function ProjectFilesCtrl(Restangular, ProjectService, $state, $window) {
    
    var vm = this;
    var projectId = $state.params.projectId;
    
    Restangular.one('projects', projectId).doGETLIST('getUploadedFiles').then(function(files) {
        vm.files = files
    });
    
    vm.download = function(file) {
        Restangular.one('projects', projectId).one('download', file.id).get().then(function (r) {
            $window.location = r;
        });
    }
    
}