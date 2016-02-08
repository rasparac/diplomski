<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username', 'img_url',
        'first_name', 'last_name', 'role', 'current_project_id'
    ];

    /**
     * Inflate relationships.
     */
    protected $with = ['projects'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'current_project_id'];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function getUsername() {
        return $this->getAttribute('username');
    }

    public function setPasswordAttribute($value) {
        $this->attributes['password'] = bcrypt($value);
    }

    public function projects() {
        return $this->belongsToMany('App\Project')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    public function invitations() {
        return $this->hasMany('App\Invitation');
    }

    public function meetings() {
        return $this->hasMany('App\Meeting');
    }
}
