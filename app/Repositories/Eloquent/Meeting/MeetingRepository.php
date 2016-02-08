<?php

namespace App\Repositories\Eloquent\Meeting;

use App\Repositories\Contracts\Meeting\MeetingInterface;
use App\Repositories\Eloquent\EloquentRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MeetingRepository extends EloquentRepository implements MeetingInterface {

    function model() {
        return 'App\Meeting';
    }

    public function get($id) {
        return $this->model->find($id);
    }

    public function allMeetings($userId, $projectId) {
        $meetings = $this->model
                ->where('project_id', $projectId)
                ->with('users')
                ->get()
                ->toArray();

        return $meetings;
    }

    public function create($userId, $projectId, $data) {
        $data['user_id'] = $userId;
        $data['project_id'] = $projectId;

        $meeting = $this->model->create($data);

        return $meeting;
    }

    public function update($id, $data) {
        $meeting = $this->get($id);

        if (!$meeting) throw new NotFoundHttpException('Meeting with ' . $id . ' not found');

        $meeting->fill($data);
        $meeting->save();

        return $meeting;
    }
}