<?php

namespace App\Repositories\Contracts\Project;

interface ProjectInterface {

    public function get($id);

    public function create($user, array $data);

    public function update($id, array $data);

    public function delete($userId, $projectId);

}