'use strict';

angular
    .module('project')
    .controller('ProjectSettingsCtrl', ProjectSettingsCtrl);

    ProjectSettingsCtrl.$inject = ['ProjectService', '$state', 'Messages', '$scope', 'Upload', '$timeout', 'UserService'];

function ProjectSettingsCtrl(ProjectService, $state, Messages, $scope, Upload, $timeout, UserService) {

    var vm = this;
    vm.project = {};
    vm.userId = $state.params.userId;

    ProjectService.getProject($state.params.projectId).then(function (project) {
        vm.project = project;
    });

    vm.updateProject = function() {
        ProjectService.updateProject(vm.project).then(function(project) {
            vm.project = project;
            UserService.user['curret_project'] = project;
            Messages.success('Your projects is updated successfully');
        }).catch(function(error){
            Messages.error(error.data);
        })
    }

    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'api/v1/projects/upload',
          data: {
              file: file
          }
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
          });
        }, function (response) {
          if (response.status > 0)
            console.log(response.status + ': ' + response.data);
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
}
