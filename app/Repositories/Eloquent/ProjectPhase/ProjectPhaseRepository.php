<?php

namespace App\Repositories\Eloquent\ProjectPhase;


use App\Repositories\Contracts\ProjectPhase\ProjectPhaseInterface;
use App\Repositories\Eloquent\EloquentRepository;

class ProjectPhaseRepository extends EloquentRepository implements ProjectPhaseInterface {

    public function model() {
        return 'App\ProjectPhase';
    }

    public function get($id) {
        return $this->model->find($id);
    }

    public function create($userId, $projectId, $data) {
        $data['user_id'] = $userId;
        $data['project_id'] = $projectId;

        $phase = $this->model->create($data);

        return $phase;
    }

    public function getAllPhasesForProject($userId, $projectId) {
        $phases = $this->model
                ->where('user_id', $userId)
                ->where('project_id', $projectId)
                ->get()
                ->toArray();

        return $phases;
    }

    public function getProjectPhaseMeetings($projectPhaseId) {
        $projectPhase = $this->get($projectPhaseId);

        $meetings = $projectPhase->meetings()->get();

        return $meetings;
    }
}