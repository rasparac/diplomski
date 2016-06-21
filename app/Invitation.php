<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model {

    protected $table = 'users_invitations';

    protected $fillable = [
        'project_id', 'invited_user', 'invited_by',
            'invited_by_username', 'project_name'
    ];

    protected $casts = [
        'accepted' => 'string',
        'invited_by' => 'integer'
    ];

    public function projects() {
        return $this->belongsTo('App\Project');
    }

    public function users() {
        return $this->belongsTo('App\User');
    }

}
