<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\ProjectFiles;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectsFormRequest;
use App\Repositories\Contracts\User\UserInterface as User;
use App\Repositories\Contracts\Project\ProjectInterface as Project;

class ProjectsController extends Controller {

    protected $project;
    protected $user;

    public function __construct(Project $project, User $user) {
        $this->project = $project;
        $this->user = $user;
    }

    public function get($id) {
        return $this->project->get($id);
    }

    public function post($userId, ProjectsFormRequest $request) {
        $input = $request->all();
        $user = $this->user->get($userId);

        if ($project = $this->project->create($user, $input)) {
            return $project;
        }

        return response()->json(['error' => 'There was a problem!', 500]);
    }

    public function put($projectId, ProjectsFormRequest $request) {
        $input = $request->all();

        if ($project = $this->project->update($projectId, $input)) {
            return $project;
        }

        return response()->json(['error' => 'There was a problem!', 500]);
    }

    public function delete($userId, $projectId) {
        $this->project->delete($userId, $projectId);
        return response()->json(['success' => 'Deleted successfully!', 200]);
    }

    public function uploadFiles($userId, $projectId, Request $request) {
        $path = 'files/projects/' . $projectId;
        $destinationPath = public_path($path);

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0777, true);
        }

        foreach ($request->file('files') as $file) {
            $fileName = $file->getClientOriginalName();
            $data['project_id'] = $projectId;
            $data['user_id'] = $userId;
            $data['name'] = $fileName;
            $data['path'] = $path . '/' . $fileName;

            if (ProjectFiles::create($data)) {
                $file->move($destinationPath, $fileName);
            }
        }
    }

    public function getUploadedFiles($projectId) {
        $files = $this->project->get($projectId)->files()->get()->toArray();

        return $files;
    }

}