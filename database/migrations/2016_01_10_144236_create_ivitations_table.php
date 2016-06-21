<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIvitationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_invitations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('invited_by');
            $table->integer('project_id');
            $table->string('invited_by_username');
            $table->string('project_name');
            $table->enum('status', ['NOT_ACCEPTED', 'ACCEPTED', 'DENIED']);
            $table->string('invited_user');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::drop('users_invitations');
    }
}
