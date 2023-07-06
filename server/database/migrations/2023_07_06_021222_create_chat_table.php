<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned(); //userID参照
            $table->integer('group_id')->unsigned(); //userID参照
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('group_id')->references('group_id')->on('groups');
            $table->text('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
