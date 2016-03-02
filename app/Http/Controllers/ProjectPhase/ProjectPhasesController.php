<?php

namespace App\Http\Controllers\ProjectPhases;


use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectPhaseRequest;
use App\Repositories\Contracts\ProjectPhase\ProjectPhaseInterface;

class ProjectPhasesController extends Controller {

    protected $phase;

    public function __construct(ProjectPhaseInterface $phase) {
        $this->phase = $phase;
    }

    public function post($userId, $projectId, ProjectPhaseRequest $request) {
        $input = $request->all();

        if ($phase = $this->phase->create($userId, $projectId, $input)) {
            return $phase;
        }

        return response()->json(['error' => 'Problem']);
    }

}