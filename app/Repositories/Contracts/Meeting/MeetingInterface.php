<?php

namespace App\Repositories\Contracts\Meeting;


interface MeetingInterface {

    public function get($id);

    public function allMeetings($userId, $projectId);

    public function create($userId, $projectId, $data);

    public function update($id, $data);

}