<?php

namespace App\Repositories\Eloquent\Invitation;


use App\Repositories\Contracts\Invitation\InvitationInterface;
use App\Repositories\Eloquent\EloquentRepository;

class InvitationRepository extends EloquentRepository implements InvitationInterface {

    public function model() {
        return 'App\Invitation';
    }

    public function get($id) {
        return $this->model->find($id);
    }

    public function create($user, array $data) {
        $data['invited_by'] = $user->getKey();
        $data['invited_user'] = $data['email'];
        unset($data['email']);

        $invitation  = $this->model->create($data);

        return $invitation;
    }

    public function acceptInvitation($id) {
        $invitation = $this->get($id);
        $invitation->status = 'ACCEPTED';
        $invitation->save();

        return $invitation;
    }

    public function declineInvitation($id) {
        $invitation = $this->get($id);
        $invitation->status = 'DENIED';
        $invitation->save();

        return $invitation;
    }

    public function getInvitationsByEmail($email) {
       return $this->model->whereInvitedUser($email)->get()->toArray();
    }

    public function getUnAcceptedInvitations($email) {
        return $this->model->whereInvitedUser($email)->whereStatus('NOT_ACCEPTED')->get();
    }
}