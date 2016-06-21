<?php

namespace App\Repositories\Contracts\MeetingTask;


interface MeetingTaskInterface {

    public function get($id);

    public function create($meetingId, $data);

    public function updateStatus($taskId, $status);

    public function delete($meetingId, $taskId);

}