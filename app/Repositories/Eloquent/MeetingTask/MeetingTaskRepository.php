<?php

namespace App\Repositories\Eloquent\MeetingTask;


use App\Repositories\Contracts\MeetingTask\MeetingTaskInterface;
use App\Repositories\Eloquent\EloquentRepository;

class MeetingTaskRepository extends EloquentRepository implements MeetingTaskInterface {

    function model() {
        return 'App\MeetingTask';
    }

    public function get($id) {
        return $this->model->find($id);
    }

    public function create($meetingId, $data) {
        $data['meeting_id'] = $meetingId;

        $meetingTask = $this->model->create($data);

        return $meetingTask;
    }

    public function updateStatus($taskId, $status) {
        $task = $this->get($taskId);
        $task->status = $status;
        $task->save();
        return $task;
    }

    public function delete($meetingId, $taskId) {
        $task = $this->get($taskId);

        if (!$task) throw new NotFoundHttpException('Project with ' . $projectId . ' not found');

        $task->delete();
    }
}