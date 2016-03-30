<?php

namespace App\Http\Controllers\ProjectPhase;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectPhaseRequest;
use App\Repositories\Contracts\ProjectPhase\ProjectPhaseInterface as ProjectPhase;

class ProjectPhasesController extends Controller {

    protected $phase;

    public function __construct(ProjectPhase $phase) {
        $this->phase = $phase;
    }

    public function post($userId, $projectId, ProjectPhaseRequest $request) {

        $input = $request->all();

        if ($phase = $this->phase->create($userId, $projectId, $input)) {
            return $phase;
        }

        return response()->json(['status' => 'error', 'message' => 'Problem!']);
    }

    public function getPhaseMeetings($userId, $projectId, $phaseId) {
        $meetings = $this->phase->getProjectPhaseMeetings($phaseId)->toArray();

        return $meetings;
    }

}