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
        Schema::create('events', function (Blueprint $table) {
            $table->increments('event_id');
            $table->string('event_name', 250);
            $table->string('prefecture', 100);
            $table->string('address', 100);
            $table->float('lng', 13, 10)->nullable();
            $table->float('lat', 13, 10)->nullable();
            $table->integer('created_by')->unsigned(); //userID参照
            $table->integer('group_id')->unsigned(); //groupID参照
            $table->string('type');
            $table->string('header_path', 350)->default(""); //画像
            $table->string('desc', 350);
            // イベントの開催日
            $table->date('date');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->foreign('group_id')->references('group_id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['group_id']);
        });


        Schema::dropIfExists('events');
    }
};
