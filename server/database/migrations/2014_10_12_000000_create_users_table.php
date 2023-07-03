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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('user_name', 128);
            $table->date('birthday')->nullable();
            $table->string('gender', 10)->nullable();
            $table->string('email', 256)->unique();
            $table->string('password', 64);
            // アイコンのパスが入るのか？nullの場合は初期アイコン
            $table->string('icon_pic')->nullable();
            $table->string('back_pic')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
