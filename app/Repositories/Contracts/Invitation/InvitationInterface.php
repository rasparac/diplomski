<?php

namespace App\Repositories\Contracts\Invitation;

interface InvitationInterface {

    public function get($id);

    public function acceptInvitation($id);

    public function declineInvitation($id);

    public function getInvitationsByEmail($email);

    public function getUnAcceptedInvitations($email);

    public function create($user, array $data);

}