<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Redirect;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
        ModelNotFoundException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        //if ($e instanceof ModelNotFoundException) {
        if ($e instanceof NotFoundHttpException) {
            return response()->view('index');
        }
        if ($e instanceof TokenInvalidException) {
            return response()->json(['message' => 'Token invalid','status_code' => 401], 401);
        }
        if ($e instanceof TokenExpiredException) {
            return response()->json(['message' => 'Token has expired','status_code' => 498], 498);
        }

        return parent::render($request, $e);
    }
}
