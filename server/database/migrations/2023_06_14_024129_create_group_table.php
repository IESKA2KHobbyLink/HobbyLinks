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
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('group_id');
            $table->string('group_name', 128);
            $table->integer('created_by')->unsigned(); //userID
            $table->integer('category_id')->unsigned();
            $table->integer('people_limit')->nullable();
            $table->string('header_path', 350)->default(""); //画像
            $table->string('desc'); // description=説明 の略
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->foreign('category_id')->references('category_id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groups', function (Blueprint $table) {
            // $table->dropForeign(['created_by']);
            $table->dropForeign(['category_id']);
        });


        Schema::dropIfExists('groups');
    }
};
