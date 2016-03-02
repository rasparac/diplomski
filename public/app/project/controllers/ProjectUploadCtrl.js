'use strict';

angular
    .module('project')
    .controller('ProjectUploadCtrl', ProjectUploadCtrl);

ProjectUploadCtrl.$inject = ['Upload', 'UserService', 'Messages', 'Restangular'];
    
function ProjectUploadCtrl(Upload, UserService, Messages, Restangular) {
    
    var vm = this;
    var user = UserService.user;
    var project = user.current_project;
    
    vm.uploadFiles = function (files) {
        if (files && files.length) {
            Upload.upload({
                url: 'api/v1/users/' + user.id + '/projects/' + project.id + '/uploadFiles',
                method: 'POST',
                sendFieldsAs: 'form',
                data: {
                    files: files
                }
            }).then(function (response) {
                if (response.status == 200) {
                    Messages.info('Files uploaded succesfully!');
                }
            }, function (error) {
                console.log("error", error);
            }, function (evt) {
               // console.log(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)));
            });
        }
    };
    
}