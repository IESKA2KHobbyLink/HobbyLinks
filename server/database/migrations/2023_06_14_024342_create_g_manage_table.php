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
        Schema::create('g_manages', function (Blueprint $table) {
            $table->integer('group_id')->unsigned();
            $table->integer('user_id')->unsigned();

            $table->timestamp('ent_date')->useCurrent(); // ユーザの参加日

            $table->timestamps();
            $table->softDeletes();

            // 複合主キーじゃないと元テーブルとの整合性がとれなくなる
            $table->primary(['group_id', 'user_id']);

            $table->foreign('group_id')->references('group_id')->on('groups');
            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('g_manages', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('g_manages');
    }
};
