<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
