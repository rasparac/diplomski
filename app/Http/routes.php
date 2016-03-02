<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return response()->view('index');
});


Route::group(['prefix' => 'api/v1'], function() {
    #auth routes
    post('login', 'Auth\AuthController@login');
    post('registration', 'Auth\AuthController@register');
    get('logout', 'Auth\AuthController@logout');

    //fix this later
    //Route::group(['middleware' => ['jwt.refresh']], function() {
        //any('refresh_token', 'Auth\AuthController@refresh');
        //any('refresh_token', function () { return response(null, 204); });
    //});

    #restricted routes
    Route::group(['middleware' => ['jwt.auth']], function() {
        #home route
        get('home', 'Home\HomeController@index');
        get('listUsers', 'Auth\AuthController@listUsers');

        /**
         * User routes
         */
        get('users', 'User\UsersController@getLoggedUser');
        get('users/{id}/projects/all', 'User\UsersController@getAllUserProjects');
        post('users/{id}/uploadProfilePicture', 'User\UsersController@uploadProfilePicture');
        put('users/{id}', 'User\UsersController@update');
        put('users/{userId}/currentProject/{projectId}', 'User\UsersController@changeProject');

        /**
         * Invitation routes
         */
        get('users/{userId}/getProjectInvitations', 'Invitation\InvitationsController@getProjectInvitations');
        post('users/{userId}/sendInvitation', 'Invitation\InvitationsController@sendInvitation');
        put('users/{userId}/acceptInvitation/{invitationId}', 'Invitation\InvitationsController@acceptInvitation');

        /**
         * Project routes
         */
        get('projects/{id}', 'Project\ProjectsController@get');
        get('projects/{projectId}/getUploadedFiles', 'Project\ProjectsController@getUploadedFiles');
        post('users/{userId}/projects', 'Project\ProjectsController@post');
        post('projects/upload', 'Project\ProjectsController@upload');
        post('users/{userId}/projects/{projectId}/uploadFiles', 'Project\ProjectsController@uploadFiles');
        put('projects/{projectId}', 'Project\ProjectsController@put');
        delete('users/{userId}/projects/{projectId}', 'Project\ProjectsController@delete');

        /**
         * Project Phases routes
         */
        post('users/{userId}/projects/{projectId}/phases', 'ProjectPhase\ProjectPhasesController@post');

        /**
         * Meeting routes
         */
        get('users/{userId}/projects/{projectId}/meetings/{metingId}', 'Meeting\MeetingsController@get');
        get('users/{userId}/projects/{projectId}/allMeetings', 'Meeting\MeetingsController@getAllMeetings');
        post('users/{userId}/projects/{projectId}/meetings', 'Meeting\MeetingsController@post');
        put('users/{userId}/projects/{projectId}/meetings/{metingId}', 'Meeting\MeetingsController@put');
        delete('users/{userId}/projects/{projectId}/meetings/{metingId}', 'Meeting\MeetingsController@delete');

        /**
         * Meeting tasks
         */
        get('meetings/{meetingId}/tasks', 'MeetingTasks\MeetingTasksController@getAll');
        post('meetings/{meetingId}/tasks', 'MeetingTasks\MeetingTasksController@post');
        put('meetings/{meetingId}/tasks/{taskId}', 'MeetingTasks\MeetingTasksController@updateStatus');
        delete('meetings/{meetingId}/tasks/{taskId}', 'MeetingTasks\MeetingTasksController@delete');
    });
});
