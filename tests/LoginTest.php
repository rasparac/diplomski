<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGoToRegistration()
    {
        $this->assertTrue(true);
        $this->visit('/registration')
            ->seePageIs('/registration');
    }

    public function testCreateUser() {
        $this->type('Igor', 'email')
            ->type('12345', 'password')
            ->type('12345', 'password_confirmation')
            ->press('Create Account!');
    }
}
