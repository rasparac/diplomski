<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model {

    protected $table = 'meetings';

    protected $fillable = ['user_id', 'project_id', 'project_phase_id', 'start_date', 'end_date', 'title', 'description'];

    protected $with = ['tasks'];

    public function users() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function projects() {
        return $this->belongsTo('App\Project', 'project_id');
    }

    public function projectPhases() {
        return $this->belongsTo('App\ProjectPhase', 'project_phase_id');
    }

    public function tasks() {
        return $this->hasMany('App\MeetingTask');
    }

}
