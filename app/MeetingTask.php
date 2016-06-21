<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeetingTask extends Model {

    protected $table = 'meeting_tasks';

    protected $fillable = ['meeting_id', 'description'];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function meetings() {
        return $this->belongsTo('App\Meeting', 'meeting_id');
    }
}
