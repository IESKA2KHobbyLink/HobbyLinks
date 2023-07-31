<?php

use App\Events\TestEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('chat', function () {

    $event = event(new TestEvent('Hello, this is a test message!'));
    return null;
});
