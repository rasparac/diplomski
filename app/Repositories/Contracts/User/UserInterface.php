<?php

namespace App\Repositories\Contracts\User;


interface UserInterface {

    public function get($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);

    public function getUserByEmail($email);

    public function changeCurrentProject($userId, $projectId);

    //public function updateProfilePicture($userId, $file);
    
}