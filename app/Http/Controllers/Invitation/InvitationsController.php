<?php

namespace App\Http\Controllers\Invitation;


use App\Http\Controllers\Controller;
use App\Http\Requests\InvitationRequet;
use App\Repositories\Contracts\Project\ProjectInterface as Project;
use App\Repositories\Contracts\User\UserInterface as User;
use App\Repositories\Contracts\Invitation\InvitationInterface as Invitation;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InvitationsController extends Controller {

    protected $user;
    protected $invitation;
    protected $project;

    public function __construct(User $user, Project $project, Invitation $invitation) {
        $this->user = $user;
        $this->project = $project;
        $this->invitation = $invitation;
    }

    public function sendInvitation($userId, InvitationRequet $request) {
        $input = $request->all();
        $user = $this->user->get($userId);

        if (!$this->user->getUserByEmail($input['email'])) {
            throw new \Exception('User with ' . $input['email'] . ' not found!');
        }

        if ($this->invitation->create($user, $input)) {
            return response()->json(['msg' => 'Invitation send successfully!']);
        }

        return response()->json(['msg' => 'There was some errors!'], 500);

    }

    public function getProjectInvitations($userId) {
        $user = $this->user->get($userId);
        $userInvitations = $this->invitation->getUnAcceptedInvitations($user->email);

        return $userInvitations;
    }

    public function acceptInvitation($userId, $invitationId) {
        $user = $this->user->get($userId);
        $invitation = $this->invitation->acceptInvitation($invitationId);
        $user->projects()->attach($invitation->project_id, ['role' => 'INVITED']);
        return $this->project->get($invitation->project_id);
    }

}