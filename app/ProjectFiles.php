<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectFiles extends Model {

    protected $table = 'project_files';

    protected $fillable = ['user_id', 'project_id', 'name', 'path'];

    public function projects() {
        return $this->belongsTo('App\Project');
    }

}
