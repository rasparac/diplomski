<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectPhase extends Model {

    protected $table = 'project_phases';

    protected $fillable = ['user_id', 'project_id', 'title', 'description', 'start_date', 'end_date'];

    public function meetings() {
        return $this->hasMany('App\Meeting');
    }

    public function projects() {
        return $this->belongsTo('App\Project', 'project_id');
    }
}
