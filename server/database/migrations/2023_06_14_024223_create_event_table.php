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
            $table->string('prefecture', 5);
            $table->string('address', 100);
            $table->integer('created_by')->unsigned(); //userID参照
            $table->string('type');
            //$table->string('header_url');
            $table->string('desc');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('created_by')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
        });


        Schema::dropIfExists('events');
    }
};
