<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectPhase extends Model {

    protected $table = 'project_phases';

    protected $fillable = ['user_id', 'project_id', 'title', 'description', 'start', 'end'];


}
