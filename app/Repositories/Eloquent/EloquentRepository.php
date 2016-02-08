<?php

namespace App\Repositories\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;

abstract class EloquentRepository {

    private $app;
    protected $attributes = [];
    protected $model;

    public function __construct(App $app) {
        $this->app = $app;
        $this->makeModel();
    }

    public function makeModel() {
        $model = $this->app->make($this->model());

        if (!$model instanceof Model) {
            return 'Class must be an instance of Model';
        }

        return $this->model = $model->newInstance($this->attributes);
    }

    abstract function model();

}