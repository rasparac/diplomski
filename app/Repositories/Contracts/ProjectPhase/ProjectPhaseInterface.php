<?php

namespace App\Repositories\Contracts\ProjectPhase;


interface ProjectPhaseInterface {

    public function get($id);

    public function create($userId, $projectId, $data);

    public function getAllPhasesForProject($userId, $projectId);

    public function getProjectPhaseMeetings($projectPhaseId);

}