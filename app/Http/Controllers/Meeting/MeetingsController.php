<?php

namespace App\Http\Controllers\Meeting;


use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingRequest;
use App\Repositories\Contracts\Meeting\MeetingInterface;

class MeetingsController extends Controller {

    protected $meeting;

    public function __construct(MeetingInterface $meeting) {
        $this->meeting = $meeting;
    }

    public function get($userId, $projectId, $meetingId) {
        return $this->meeting->get($meetingId);
    }

    public function getAllMeetings($userId, $projectId) {
        return $this->meeting->allMeetings($userId, $projectId);
    }

    public function post($userId, $projectId, MeetingRequest $request) {
        $input = $request->all();

        $meeting = $this->meeting->create($userId, $projectId, $input);

        return $meeting;
    }

    public function put($userId, $projectId, $meetingId, MeetingRequest $request) {
        $input = $request->all();

        if ($meeting = $this->meeting->update($meetingId, $input)) {
            return $meeting;
        }

        return response()->json(['error' => 'There was a problem!', 500]);

    }

}