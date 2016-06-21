<?php

namespace App\Http\Controllers\MeetingTask;


use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingTaskRequest;
use App\Repositories\Contracts\MeetingTask\MeetingTaskInterface;
use Illuminate\Http\Request;

class MeetingTasksController extends Controller {

    protected $task;

    public function __construct(MeetingTaskInterface $task) {
        $this->task = $task;
    }

    public function post($meetingId, MeetingTaskRequest $request) {
        if ($task = $this->task->create($meetingId, $request->all())) {
            return $task;
        }

        return response()->json(['error' => 'There was a problem!', 500]);
    }

    public function updateStatus($meetingId, $taskId, Request $request) {
        if ($task = $this->task->updateStatus($taskId, $request->get('status'))) {
            return $task;
        }

        return response()->json(['error' => 'There was a problem!', 500]);
    }

    public function delete($meetingId, $taskId) {
        $this->task->delete($meetingId, $taskId);
        return response()->json(['success' => 'Deleted successfully!', 200]);
    }
}