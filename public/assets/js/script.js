'use strict';

angular
    .module('di',
    ['restangular', 'ui.router', 'di.ui', 'main', 'ngStorage', 'auth', 'home', 'project', 'ui.bootstrap',
        'mgcrea.ngStrap', 'profile', 'di.messages', 'userService', 'projectService', 'ngFileUpload', 'ngImgCrop', 'invitationService',
        'meeting', 'meetingService', 'projectPhase', 'angular-timeline', 'di.filters', 'meetingTaskService', 'projectPhaseService'
        ])
    .config(function(RestangularProvider, $stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('di', {
                abstract: true,
                templateUrl: 'app/index.html'
            });

        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('/api/v1');
        RestangularProvider.setDefaultHeaders({});

        $httpProvider.interceptors.push('AuthInterceptor');
    }).
    factory('AuthInterceptor', ['$q', '$localStorage', '$location', function($q, $localStorage, $location) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    console.log("response", response);
                    delete $localStorage.token;
                    $location.path('/login');
                }
                return $q.reject(response);
            },
            response: function(response) {
                return response;
            }
        };
    }])
    .run(function($rootScope, $state, $stateParams, $localStorage, $location, toastrConfig) {
        $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            if ($localStorage.token && toState.url == '/login') {
                $location.path(fromState.url);
            }
            if (toState.url == '/' && $localStorage.token != null) {
                //delete $localStorage.token;
                $location.path('/home');
            }
            if (toState.url != '/login' && toState.url != '/registration') {
                if ($localStorage.token == null) {
                    $location.path('/login');
                }
            }
        });

        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            closeButton: true,
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventOpenDuplicates: true,
            target: 'body'
        });
    });

'use strict';

angular
    .module('home', ['restangular', 'ui.router'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('di.main.home', {
                url: 'home',
                templateUrl: 'app/home/views/home.html',
                data: {
                    appName: 'Home'
                }
            })
    });

'use strict';

angular
    .module('home')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['loggedUser', 'ProjectService', '$state', 'Messages', '$localStorage', 'UserService', 'Restangular', 'InvitationService'];

function MainCtrl(loggedUser, ProjectService, $state, Messages, $localStorage, UserService, Restangular, InvitationService) {

    var vm = this;
    vm.user = UserService.user;
    
    InvitationService.getUnAcceptedInvitations(vm.user).then(function(invitations) {
        vm.invitations = invitations;
    });
    
    vm.acceptInvitation = function(invitation) {
        InvitationService.acceptInvitation(vm.user, invitation).then(function(project) {
            if (!vm.user.current_project) {
                UserService.changeCurrentProject(vm.user, project.id).then(function() {
                    $state.go('di.main.home');
                });
            }
            
            vm.user.projects.push(project);
            var index = vm.invitations.indexOf(invitation);
            if (index > -1) vm.invitations.splice(index, 1);
            Messages.info('Invitation Accepted!');
        });
    }
    
    vm.declineInvitation = function(invitation) {
        
    }

    vm.changeProject = function(project) {
        UserService.changeCurrentProject(vm.user, project.id, true).then(function() {
            $state.go('di.main.home');
        });
    }

    vm.logout = function() {
        Messages.info('Logged out!');
        delete $localStorage.token;
    }

}

'use strict';

angular
    .module('main', ['restangular', 'ui.router'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('di.main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                resolve: {
                    loggedUser: function(UserService) {
                        return UserService.getUser();
                    }
                }
            })
    });

'use strict';

angular
    .module('meeting', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('di.main.meeting', {
                url: 'users/:userId/projects/:projectId/meetings',
                abstract: true,
                templateUrl: 'app/meeting/views/meeting.html'
            })
            .state('di.main.meeting.new', {
                url: '/new',
                templateUrl: 'app/meeting/views/newMeeting.html',
                controller: 'CreateMeetingCtrl',
                controllerAs: 'createMeeting'
            })
            .state('di.main.meeting.settings', {
                url: '/:meetingId/settings',
                templateUrl: 'app/meeting/views/meetingSettings.html',
                controller: 'MeetingSettingsCtrl',
                controllerAs: 'meetingSettings'
            })
            .state('di.main.meeting.settings.tasks', {
                templateUrl: 'app/meeting/views/meetingTasks.html',
                controller: 'MeetingTasksCtrl',
                controllerAs: 'meetingTasks'
            })
            .state('di.main.meeting.settings.taskList', {
                templateUrl: 'app/meeting/views/meetingTasksList.html',
                controller: 'MeetingTasksCtrl',
                controllerAs: 'meetingTasks'
            })
            .state('di.main.meeting.timeline', {
                url: '/timeline',
                templateUrl: 'app/meeting/views/meetingsTimeline.html',
                controller: 'MeetingTimelineCtrl',
                controllerAs: 'meetingTimeline'
            });
    });
'use strict';

angular
    .module('project', ['restangular', 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('di.main.project', {
                url: 'users/:userId/projects',
                abstract: true,
                templateUrl: 'app/project/views/project.html'
            })
            .state('di.main.project.timeline', {
                url: '/:projectId/timeline',
                templateUrl: 'app/project/views/projectTimeline.html',
                controller: 'ProjectTimelineCtrl',
                controllerAs: 'timeline'
            })
            .state('di.main.project.new', {
                url: '/new',
                templateUrl: 'app/project/views/newProject.html',
                controller: 'CreateProjectCtrl',
                controllerAs: 'createProject'
            })
            .state('di.main.project.list', {
                url: '/list',
                templateUrl: 'app/project/views/projectsList.html',
                controller: 'ProjectsListCtrl',
                controllerAs: 'projectsList'
            })
            .state('di.main.project.settings', {
                url: '/:projectId/settings',
                templateUrl: 'app/project/views/projectSettings.html',
                controller: 'ProjectSettingsCtrl',
                controllerAs: 'projectSettings'
            })
            .state('di.main.project.settings.invite', {
                templateUrl: 'app/project/views/inviteUser.html',
                controller: 'ProjectInviteCtrl',
                controllerAs: 'invite'
            })
            .state('di.main.project.settings.upload', {
                templateUrl: 'app/project/views/uploadFiles.html',
                controller: 'ProjectUploadCtrl',
                controllerAs: 'upload'
            })
            .state('di.main.project.settings.uploadedFiles', {
                templateUrl: 'app/project/views/uploadedFiles.html',
                controller: 'ProjectFilesCtrl',
                controllerAs: 'files'
            });
    });

'use strict';

angular
    .module('auth', ['restangular', 'ui.router', 'ngStorage', 'toastr'])
    .config(function(RestangularProvider, $stateProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/auth/views/login.html',
                controller: 'AuthCtrl',
                controllerAs: 'auth'
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'app/auth/views/registration.html',
                controller: 'AuthCtrl',
                controllerAs: 'auth'
            });
    });
'use strict';

angular
    .module('projectPhase', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('di.main.phase', {
                url: 'users/:userId/projects/:projectId/phases',
                templateUrl: 'app/projectPhase/views/projectPhase.html',
                abstract: true,
            })
            .state('di.main.phase.new', {
                url: '/new',
                templateUrl: 'app/projectPhase/views/newPhase.html',
                controller: 'CreatePhaseCtrl',
                controllerAs: 'createPhase'
            })
            .state('di.main.phase.timeline', {
                url: '/phase-timeline',
                templateUrl: 'app/projectPhase/views/phaseTimeline.html',
                controller: 'PhaseTimelineCtrl',
                controllerAs: 'phaseTimeline'
            })
    });
'use strict';

angular
    .module('profile', ['restangular', 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider
        .state('di.main.profile', {
            url: 'users/:id/user-profile',
            templateUrl: 'app/user/views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile'
        })
    });

'use strict';

angular
    .module('di.ui', []);
'use strict';

angular
    .module('di.filters', []);
'use strict';

angular
    .module('di.filters')
    .filter('millSecondsToTimeString', function () {
        return function (miliseconds) {
            if (miliseconds) {
                var seconds = Math.floor(miliseconds / 1000);
                var hours = Math.floor((seconds % 86400) / 3600);
                var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
                var HH = hours < 10 ? '0' + hours : hours;
                var MM = minutes < 10 ? '0' + minutes : minutes;

                return HH + ':' + MM + ' h';
            }
            return '-:-';
        }
    });
'use strict';

angular
    .module('di.filters')
    .filter('timezoneDate', function() {
        return function(date, format) {
            date = moment.utc(date).toDate();
            date = moment(date).format(format);

            return date;
        }
    });
'use strict';

angular
    .module('di.auth', ['restangular', '$localStorage'])
    .factory('Auth', function(Restangular, $localStorage) {

        var service = {};

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return service;

    })

'use strict';

angular
    .module('invitationService', [])
    .factory('InvitationService', InvitationService);
    
InvitationService.$inject = ['$q'];

function InvitationService($q) {
    
    var service = {
        sendInvitation: sendInvitation,
        getUnAcceptedInvitations: getUnAcceptedInvitations,
        acceptInvitation: acceptInvitation
    }
    
    return service;
    
    function getUnAcceptedInvitations(user) {
        return user.doGETLIST('getProjectInvitations').then(function(invitations) {
             return invitations;
        });
    }
    
    function sendInvitation(user, projectId, data) {
        return user.doPOST(data, 'sendInvitation', { project_id: projectId }).then(function(response) {
            return response;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
    function acceptInvitation(user, invitation) {
        return user.one('acceptInvitation', invitation.id).doPUT().then(function(project) {
            return project;
        }, function (error) {
            return $q.resolve(error);
        });
    }
    
}
'use strict';

angular
    .module('meetingService', [])
    .factory('MeetingService', MeetingService)

MeetingService.$inject = ['$q'];

function MeetingService($q) {
    
    var service = {
        createMeeting: createMeeting,
        getMeeting: getMeeting,
        updateMeeting: updateMeeting
    }
    
    return service;
    
    function createMeeting(user, projectId, data) {
        return user.one('projects', projectId).all('meetings').post(data).then(function (meeting) {
            return meeting;
        }, function(error) {
            return $q.reject(error);
        });
    }
    
    function getMeeting(user, projectId, meetingId) {
        return user.one('projects', projectId).one('meetings', meetingId).get().then(function (meeting) {
            return meeting;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
    function updateMeeting(user, projectId, meetingId, data) {
        return user.one('projects', projectId).one('meetings', meetingId).doPUT(data).then(function (meeting) {
            return meeting;
        }, function (error) {
            return $q.reject(error);
        });
    }
    
}
'use strict';

angular
    .module('meetingTaskService', [])
    .factory('MeetingTaskService', MeetingTaskService)

MeetingTaskService.$inject = ['$q', 'Restangular'];


function MeetingTaskService($q, Restangular) {
    
    var service = {
        createTask: createTask,
        updateStatus: updateStatus,
        deleteTask: deleteTask
    }
    
    return service;
    
    function createTask(meetingId, data) {
        return Restangular.one('meetings', meetingId).one('tasks').doPOST(data).then(function (task) {
            return task;
        }, function (error) {
            return $q.reject(error);    
        });
    }
    
    function updateStatus(meetingId, taskId, data) {
        return Restangular.one('meetings', meetingId).one('tasks', taskId).doPUT(data).then(function (task) {
            return task;
        }, function (error) {
            return $q.reject(error);    
        });
    }
    
    function deleteTask(meetingId, taskId) {
        return Restangular.one('meetings', meetingId).one('tasks', taskId).remove();
    }
    
}
'use strict';

angular
    .module('di.messages', [])
    .factory('Messages', Messages);

    Messages.$inject = ['toastr'];

function Messages(toastr) {
    var service = {
        success: success,
        info: info,
        error: error,
        warning: warning
    }

    return service;

    function success(msg, title) {
        title = title || 'Success!';
        toastr.success(msg, title);
    }

    function info(msg, title) {
        title = title || 'Info!';
        toastr.info(msg, title);
    }

    function error(msg, title) {
        title = title || 'Error!';
        toastr.error(msg, title);
    }

    function warning(msg, title) {
        title = title || 'Warning!';
        toastr.warning(msg, title);
    }
}

'use strict';

angular
    .module('projectPhaseService', [])
    .factory('ProjectPhaseService', ProjectPhaseService)

ProjectPhaseService.$inject = ['$q', 'Restangular'];

function ProjectPhaseService($q, Restangular) {
    var service = {
        createPhase: createPhase,
        getPhaseMeetings: getPhaseMeetings
    }

    function createPhase(user, projectId, data) {
        return user.one('projects', projectId).all('phases').post(data).then(function(projectPhase) {
            return projectPhase;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function getPhaseMeetings(user, projectId, phaseId) {
        return user.one('projects', projectId).one('phases', phaseId).all('meetings').getList().then(function(meetings) {
            return meetings;
        }, function(error) {
            return $q.reject(error);
        });
    }

    return service;
}
'use strict';

angular
    .module('projectService', [])
    .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['Restangular', 'Messages', '$q'];

function ProjectService(Restangular, Messages, $q) {

    var service = {
        createProject: createProject,
        updateProject: updateProject,
        getProject: getProject,
        deleteProject: deleteProject
    }

    return service;

    function createProject(user, data) {
        return user.all('projects').post(data).then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function updateProject(project, data) {
        return project.put().then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function getProject(projectId) {
        return Restangular.one('projects', projectId).get().then(function(project) {
            return project;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function deleteProject(project) {
        return project.remove();
    }

}

'use strict';

angular
    .module('userService', [])
    .factory('UserService', UserService);

    UserService.$inject = ['Restangular', 'Messages', '$q'];

function UserService(Restangular, Messages, $q) {

    var service = {
        getUser: getUser,
        updateUserProfile: updateUserProfile,
        changeCurrentProject: changeCurrentProject,
        getUserProjects: getUserProjects
    }

    return service;
    
    service.user = null;

    function getUser() {
        return Restangular.one('users').get().then(function(user) {
            service.user = user;
            return user;
        }, function(error) {
            return $q.reject(error);
        });
    }

    function updateUserProfile(user) {
        return user.put().then(function(user) {
            return user;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function getUserProjects(user) {
        return user.all('projects').doGETLIST('all').then(function(projects) {
            return projects;
        }, function(error) {
            return $q.reject(error);
        })
    }

    function changeCurrentProject(user, projectId, showMessage) {
        return user.one('currentProject', projectId).put().then(function(user) {
            service.user.current_project = user.current_project;
            if (showMessage) {
                Messages.success('You switched project successfully!');
            }
        }, function (error) {
            return $q.reject(error);
        });
    }

}

'use strict';

angular
    .module('meeting')
    .controller('CreateMeetingCtrl', CreateMeetingCtrl);

CreateMeetingCtrl.$inject = ['UserService', 'MeetingService', 'Messages', '$state'];
    
function CreateMeetingCtrl(Userservice, MeetingService, Messages, $state) {
    
    var vm = this;
    vm.meetingData = {};
    var user = Userservice.user;    

    user.one('projects', user.current_project.id).doGETLIST('project-phases').then(function (phases) {
        vm.phasesList = _.map(phases, function(phase) {
            return {
                id: phase.id,
                name: phase.title
            }
        })
    });    
    
    vm.createMeeting = function () {
        var projectId = user.current_project.id;

        if (vm.meeting === 1) {
            vm.meetingData.project_phase_id = null;
        }

        MeetingService.createMeeting(user, projectId, vm.meetingData).then(function (meeting) {
            $state.transitionTo('di.main.project.settings', {userId: user.id, projectId: projectId});
            Messages.success('Meeting created successfully!');
        }).catch(function (error) {
            vm.validationErrors = error.data;
            Messages.error('Check input fields!');
        });
    }
    
}
'use strict';

angular
    .module('meeting')
    .controller('MeetingSettingsCtrl', MeetingSettingsCtrl);

MeetingSettingsCtrl.$inject = ['$state', 'UserService', 'MeetingService', '$filter'];

function MeetingSettingsCtrl($state, UserService, MeetingService, $filter) {
    
    var vm = this;
    var user = UserService.user;
    var meetingId = $state.params.meetingId;
    
    MeetingService.getMeeting(user, user.current_project.id, meetingId).then(function (meeting) {
        vm.meeting = meeting;
        vm.meeting.start_date = moment.utc(vm.meeting.start_date);
        vm.meeting.end_date = moment.utc(vm.meeting.end_date);
    });
    
    vm.updateMeeting = function () {
        MeetingService.updateMeeting(user, user.current_project.id, meetingId, vm.meeting).then(function (meeting) {
            vm.meeting = meeting;
        }).catch(function (error) {

        });
    }
    
}
'use strict';

angular
    .module('meeting')
    .controller('MeetingTasksCtrl', MeetingTasksCtrl);

MeetingTasksCtrl.$inject = ['$state', 'MeetingTaskService', 'Messages', 'MeetingService', 'UserService'];

function MeetingTasksCtrl($state, MeetingTaskService, Messages, MeetingService, UserService) {
    
    var vm = this;
    vm.taskData = {};
    var user = UserService.user;
    var meetingId = $state.params.meetingId;

    MeetingService.getMeeting(user, $state.params.projectId, meetingId).then(function (meeting) {
        vm.meetingTaskList = meeting.tasks;
    });
   
    vm.addTask = function () {
        MeetingTaskService.createTask(meetingId, vm.taskData).then(function (task) {
            Messages.success('Task created successfuly!');
            vm.meetingTaskList.push(task);
            vm.taskData = {};
        }).catch(function (error) {
            vm.validationErrors = error.data;
            Messages.error('Check input field!');
        });
    }
    
    vm.updateStatus = function (task) {
        MeetingTaskService.updateStatus(meetingId, task.id, task).then(function (task) {
            Messages.success('Task status updated');
        }).catch(function (error) {
            console.log(error.data);
        })
    }
    
    vm.deleteTask = function (task) {
        var index = vm.meetingTaskList.indexOf(task);
        if (index > -1) {
            vm.meetingTaskList.splice(index, 1);
        }
        MeetingTaskService.deleteTask(meetingId, task.id);
    }
    
}
'use strict';

angular
    .module('meeting')
    .controller('MeetingTimelineCtrl', MeetingTimelineCtrl);

MeetingTimelineCtrl.$inject = ['$state', 'UserService', 'MeetingService', 'ProjectPhaseService'];

function MeetingTimelineCtrl($state, UserService, MeetingService, ProjectPhaseService) {
    
    var vm = this;
    var user = UserService.user;
    vm.project = user.current_project;

    getAllMeetings();

    user.one('projects', user.current_project.id).doGETLIST('project-phases').then(function(phases) {
        vm.phasesList = _.map(phases, function(phase) {
            return {
                id: phase.id,
                name: phase.title
            }
        })
    });

    vm.getPhaseMeetings = function(phase) {
        if (!phase) {
            getAllMeetings();
        } else {
            ProjectPhaseService.getPhaseMeetings(user, vm.project.id, phase.id).then(function(meetings) {
                vm.meetings = meetings
                getFinishedTasks(vm.meetings);
            })
        }
    }

    function getAllMeetings() {
        user.one('projects', vm.project.id).doGETLIST('allMeetings').then(function (meetings) {
            vm.meetings = meetings;
            getFinishedTasks(vm.meetings);
        });
    }

    function getFinishedTasks(meetings) {
        _.forEach(meetings, function(meeting) {
            meeting.finishedTasks = _.filter(meeting.tasks, function(task) {
                return task.status == true
            }).length;
        });
    }
    
}
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
'use strict';

angular
    .module('project')
    .controller('ProjectInviteCtrl', ProjectInviteCtrl);
    
ProjectInviteCtrl.$inject = ['$state', 'UserService', 'Messages', 'InvitationService'];

function ProjectInviteCtrl($state, UserService, Messages, InvitationService) {
    
    var vm = this;
    vm.invitationData = {};
    
    vm.sendInvitation = function () {
        var user = UserService.user;
        var projectId = $state.params.projectId;
        vm.invitationData.invited_by_username = user.username;
        vm.invitationData.project_name = user.current_project.project_name;

        InvitationService.sendInvitation(user, projectId, vm.invitationData).then(function(response) {
            Messages.info(response.msg);
            vm.invitationData = {};
        }).catch(function (error) {
            if (error.status != 422) {
                Messages.error("User with that E-mail does not exists!");
            } else {
                Messages.error("Check E-Mail input!");
            }
            vm.validationErrors = error.data;
        });
    }
    
}    
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

'use strict';

angular
    .module('di.ui')
    .directive('afterConfirmation', confirmPopUp);
    
function confirmPopUp() {
    var directive = {
        restrict: 'A',
        link: link
    }

    function link(scope, elem, attrs) {
        elem.bind('click', function (e) {
            var msg = attrs.confirmMessage;
            if (msg && confirm(msg)) {
                scope.$apply(attrs.afterConfirmation);
            }
        });
    }

    return directive;
}


'use strict';

angular
    .module('di.ui')
    .directive('datepickerLocaldate', ['$parse', function ($parse) {
            var directive = {
                restrict: 'A',
                require: ['ngModel'],
                link: link
            };
            return directive;

            function link(scope, element, attr, ctrls) {
                var ngModelController = ctrls[0];

                // called with a JavaScript Date object when picked from the datepicker
                ngModelController.$parsers.push(function (viewValue) {
                    // undo the timezone adjustment we did during the formatting
                    viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
                    // we just want a local date in ISO format
                    return viewValue.toISOString().substring(0, 10);
                });

                // called with a 'yyyy-mm-dd' string to format
                ngModelController.$formatters.push(function (modelValue) {
                    if (!modelValue) {
                        return undefined;
                    }
                    // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                    var dt = new Date(modelValue);
                    // 'undo' the timezone offset again (so we end up on the original date again)
                    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                    return dt;
                });
            }
        }]);
'use strict';

angular
    .module('di.ui')
    .directive('validationErrors', validationErrors);

function validationErrors() {
    var directive = {
        restrict: 'E',
        scope: {
            errorMessages: '=?'
        },
        templateUrl: 'app/common/directives/ValidationErrors/ValidationErrors.html',
        replace: true
    }

    return directive;
}

'use strict';

angular
    .module('di.ui')
    .directive('customTimeline', customTimeline);

function customTimeline() {
    var directive = {
        restrict: 'E',
        link: link,
        replace:true,
        scope: {
            timelineData: '=',
            project: '=',
            dateFormat: '@?',
            state: '@'
        },
        templateUrl: 'app/common/directives/Timeline/timeline.html',
    }

    function link(scope, elem, attr) {

    }    

    return directive;
    
}