<?php
/**
 * Created by PhpStorm.
 * User: igor
 * Date: 18.01.16.
 * Time: 12:48
 */

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

    }

}