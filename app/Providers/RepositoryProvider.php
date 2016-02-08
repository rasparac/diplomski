<?php

namespace App\Providers;

use App\Repositories\Eloquent\Invitation\InvitationRepository;
use App\Repositories\Eloquent\Meeting\MeetingRepository;
use App\Repositories\Eloquent\MeetingTask\MeetingTaskRepository;
use App\Repositories\Eloquent\Project\ProjectRepository;
use App\Repositories\Eloquent\ProjectPhase\ProjectPhaseRepository;
use App\Repositories\Eloquent\User\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        #User repository
        $this->app->bind('App\Repositories\Contracts\User\UserInterface', function($app){
            return new UserRepository($app);
        });

        #Project repository
        $this->app->bind('App\Repositories\Contracts\Project\ProjectInterface', function($app) {
            return new ProjectRepository($app);
        });

        #Invitation repository
        $this->app->bind('App\Repositories\Contracts\Invitation\InvitationInterface', function($app) {
           return new InvitationRepository($app);
        });

        #Meeting repository
        $this->app->bind('App\Repositories\Contracts\Meeting\MeetingInterface', function($app) {
            return new MeetingRepository($app);
        });

        #Project Phase repository
        $this->app->bind('App\Repositories\Contracts\ProjectPhase\ProjectPhaseInterface', function($app) {
            return new ProjectPhaseRepository($app);
        });

        #Meeting Task repository
        $this->app->bind('App\Repositories\Contracts\MeetingTask\MeetingTaskInterface', function($app) {
            return new MeetingTaskRepository($app);
        });
    }
}
