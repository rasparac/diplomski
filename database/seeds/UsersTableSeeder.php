<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
            'email' => 'test@net.hr',
            'username' => 'Test user',
            'password' => 'testis'
            ],
            [
                'email' => 'test1@net.hr',
                'username' => 'Test user1',
                'password' => 'testis'
            ],

        ];

        foreach ($users as $user) {
            \App\User::create($user);
        }
    }
}
