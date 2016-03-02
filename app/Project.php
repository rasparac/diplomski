<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class Project extends Model {

    protected $table = 'projects';

    protected $casts = [
        'associates_number' => 'integer',
        'finished_percentage' => 'integer'
    ];

    protected $fillable = [
        'project_name', 'start_date', 'end_date', 'project_logo',
        'associates_number', 'created_by', 'description', 'finished_percentage'
    ];

    public static function boot() {

        parent::boot();

        static::deleted(function($project) {
            $path = public_path('files/projects/' . $project->id);

            if (File::exists($path)) {
                File::deleteDirectory($path);
            }
        });
    }

    public function users() {
        return $this->belongsToMany('App\User')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    public function invitations() {
        return $this->hasMany('App\Invitation');
    }

    public function files() {
        return $this->hasMany('App\ProjectFiles');
    }

    public function meetings() {
        return $this->hasMany('App\Meeting');
    }
}
