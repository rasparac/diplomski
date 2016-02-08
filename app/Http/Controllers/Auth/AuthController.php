<?php

namespace App\Http\Controllers\Auth;

use App\Repositories\Contracts\User\UserInterface;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegistrationPostRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {

    protected $user;

    public function __construct(UserInterface $user) {
        $this->user = $user;
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function register(RegistrationPostRequest $request) {
        $data = $request->all();

        try {
            $this->user->create($data);
        } catch (Exception $e) {
            return Response::json(['error' => 'User already exists.'], \HttpResponse::HTTP_CONFLICT);
        }
    }

    public function logout() {
        Auth::logout();
    }

    /*public function refresh(Request $request) {
        var_dump($request);
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);

        return response()->json(compact('newToken'));
    }*/
}
