<?php

namespace App\Repositories\Eloquent\Project;

use App\Repositories\Contracts\Project\ProjectInterface;
use App\Repositories\Eloquent\EloquentRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProjectRepository extends EloquentRepository implements ProjectInterface {

    public function get($id) {
        return $this->model->find($id);
    }

    public function create($user, array $data) {
        $data['created_by'] = $user->email;
        $project = $this->model->create($data);
        $project->users()->attach($user->id);
        return $project;
    }

    public function update($id, array $data) {
        $project = $this->get($id);

        if (!$project) throw new NotFoundHttpException('Project with ' . $id . ' not found');

        $project->fill($data);
        $project->save();

        return $project;
    }

    public function delete($userId, $projectId) {
        $project = $this->get($projectId);

        if (!$project) throw new NotFoundHttpException('Project with ' . $projectId . ' not found');

        $project->delete();
        $project->users()->detach($userId);
    }

    function model() {
        return 'App\Project';
    }
}