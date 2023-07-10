<?php

use App\Http\Controllers\E_manageController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\G_manageController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PhotoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Users Routes
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/user/{id}/created_groups', [UserController::class, 'queryUsercreatedGroups']); //query user created groups
Route::get('/user/{id}/created_events', [UserController::class,'queryUsercreatedEvents']); //query user created events


//Auth Routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

//Groups Routes
Route::get('/groups', [GroupController::class, 'index']);
Route::get('/groups/{id}', [GroupController::class, 'show']);
Route::post('/groups', [GroupController::class, 'store']);
Route::put('/groups/{id}', [GroupController::class, 'update']);
Route::delete('/groups/{id}', [GroupController::class, 'destroy']);


//Events Routes
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

//Gmanage route
Route::get('/groups/{id}/users', [G_manageController::class, 'queryUserInGroup']);
Route::post('/groups/{id}/users', [G_manageController::class, 'addUserToGroup']);
Route::delete('/groups/{id}/users', [G_manageController::class, 'removeUserFromGroup']);

//Emange route
Route::get('/events/{id}/users', [E_manageController::class, 'queryUserInEvent']);
Route::post('/events/{id}/users', [E_manageController::class, 'addUserToEvent']);
Route::delete('/events/{id}/users', [E_manageController::class, 'removeUserFromEvent']);

//photos
Route::post('/photos', [PhotoController::class, 'upload']);
