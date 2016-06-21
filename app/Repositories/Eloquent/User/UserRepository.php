<?php

namespace App\Repositories\Eloquent\User;


use App\Repositories\Contracts\User\UserInterface;
use App\Repositories\Eloquent\EloquentRepository;
use App\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserRepository extends EloquentRepository implements UserInterface {

    /**
     * set User model
     */
    function model() {
        return 'App\User';
    }

    public function get($id) {
        return $this->model->find($id);
    }

    public function create(array $data) {
        $this->model->email = $data['email'];
        $this->model->password = bcrypt($data['password']);
        return $this->model->save();
    }

    public function update($id, array $data) {
        $user = $this->get($id);

        if (!$user) throw new NotFoundHttpException('User with ' . $id . ' not found');

        $user->fill($data);
        $user->save();

        return $user;
    }

    public function delete($id) {
        $user = $this->get($id);

        if (!$user) throw new NotFoundHttpException('User with ' . $id . ' not found');

        $user->delete();
    }

    public function getUserByEmail($email) {
        return $this->model->whereEmail($email)->first();
    }

    public function changeCurrentProject($userId, $projectId) {
        $user = $this->get($userId);

        if (!$user) throw new NotFoundHttpException('User with ' . $userId . ' not found');

        $user->current_project_id = $projectId;
        $user->save();

        return $user;
    }

    /*public function updateProfilePicture($userId, $file) {
        $user = $this->user->get($userId);
        $path = 'images/profile/' . $userId;
        $destinationPath = public_path($path);

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0777, true);
        }


    }*/

}