<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Repositories\Contracts\Project\ProjectInterface as Project;
use App\Repositories\Contracts\User\UserInterface as User;
use App\Repositories\Contracts\Invitation\InvitationInterface as Invitation;

class UsersController extends Controller {

    protected $user;
    protected $invitation;
    protected $project;
    protected $loggedUser;

    public function __construct(User $user, Project $project, Invitation $invitation) {
        $this->loggedUser = JWTAuth::parseToken()->authenticate();
        $this->user = $user;
        $this->project = $project;
        $this->invitation = $invitation;
    }

    public function getLoggedUser() {
        $user = $this->loggedUser;
        $user->current_project = $this->project->get($user->current_project_id);
        return $user;
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request) {
        $input = $request->all();

        if ($updatedUser = $this->user->update($id, $input)) {
            return $updatedUser;
        }

        return response()->json(['error' => 'There was a problem, contact administrator'], 500);
    }

    /**
     * Change user current project, if user logout
     * @param $userId
     * @param $projectId
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeProject($userId, $projectId) {
        if ($updatedUser = $this->user->changeCurrentProject($userId, $projectId)) {
            $updatedUser->current_project = $this->project->get($projectId);
            return $updatedUser;
        }

        return response()->json(['error' => 'There was a problem, contact administrator'], 500);
    }

    public function uploadProfilePicture($userId, Request $request) {
        $user = $this->user->get($userId);
        $path = 'images/profile/' . $userId;
        $destinationPath = public_path($path);

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0777, true);
        }

        foreach ($request->file() as $file) {
            $fileName = 'user_id_' . $userId;
            $user->image_url = 'images/profile/' . $userId . '/' . $fileName;

            if ($user->save()) {
                $file->move($destinationPath, $fileName);
                return $user;
            }
        }

    }

    public function getAllUserProjects($userId) {
        $projects = $this->user->get($userId)->projects()->with('meetings')->get();
        return $projects;
    }

}