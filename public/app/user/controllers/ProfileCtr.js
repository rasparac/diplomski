'use strict';

angular
    .module('profile')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['UserService', 'loggedUser', 'Messages', '$state', 'Upload', '$modal'];

function ProfileCtrl(UserService, loggedUser, Messages, $state, Upload, $modal) {

    var vm = this;

    vm.user = UserService.user;

    var pictureUploadModal = $modal({
        controller: 'ProfileCtrl as profile',
        resolve: {
            loggedUser: function() {
                return loggedUser;
            }
        },
        templateUrl: '/app/user/modal/profilePicture.html',
        show: false
    });

    vm.showModal = function() {
        pictureUploadModal.$promise.then(pictureUploadModal.show);
    }

    vm.hideModal = function() {
        pictureUploadModal.$promise.then(pictureUploadModal.hide);
    }

    vm.updateProfile = function() {
        UserService.updateUserProfile(vm.user).then(function(user) {
            vm.user = user;
            Messages.success('Your profile is updated successfully');
        });
    }

    vm.upload = function(dataUrl) {
        var file = Upload.dataUrltoBlob(dataUrl);
        Upload.upload({
            url: 'api/v1/users/' + vm.user.id + '/uploadProfilePicture',
            method: 'POST',
            sendFieldsAs: 'form',
            data: {
                file: file
            },
        }).then(function (response) {
            if (response.status == 200) {
                vm.user['image_url'] = response.data['image_url'] + "?" + new Date().getTime();
                vm.hideModal();
            }
        }, function (response) {
            console.log(response)
        });
    }

}
