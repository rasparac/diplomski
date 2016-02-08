<?php

namespace App\Repositories\Eloquent\ProjectPhase;


use App\Repositories\Contracts\ProjectPhase\ProjectPhaseInterface;
use App\Repositories\Eloquent\EloquentRepository;

class ProjectPhaseRepository extends EloquentRepository implements ProjectPhaseInterface {

    public function model() {
        return 'App\ProjectPhase';
    }

    public function get($id) {

    }

    public function create($userId, $projectId, $data) {
        $data['user_id'] = $userId;
        $data['project_id'] = $projectId;

        $phase = $this->model->create($data);

        return $phase;
    }

}