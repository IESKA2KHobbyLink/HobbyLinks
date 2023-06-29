<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EManage;
use App\Models\User;

class E_manageController extends Controller
{
    //
    public function addUserToEvent(Request $request)
    {
        $validatedData = $request->validate([
            'event_id' => 'required|exists:events,event_id',
            'user_id' => 'required|exists:users,user_id',
            'group_id' => 'required|exists:groups,group_id',
        ]);

        $emanage =  EManage::create($validatedData);
        $userIds = $emanage->user_id;
        $usersData = User::find($userIds); // Retrieve users from the 'users' table
        return response()->json(['message' => 'User added to event successfully', 'emanage' => $emanage, 'usersData' => $usersData], 200);
    }

    public function removeUserFromEvent(Request $request)
    {
        $validatedData = $request->validate([
            'event_id' => 'required|exists:e_manages,event_id',
            'user_id' => 'required|exists:e_manages,user_id',
            'group_id' => 'required|exists:e_manages,group_id',
        ]);

        EManage::where($validatedData)->delete();
        return response()->json('User removed from event successfully', 200);
    }

    public function queryUserInEvent($eventId)
    {
        $users = EManage::where('event_id', $eventId)->get();
        $userIds = $users->pluck('user_id')->toArray(); // Extract user IDs from the result
        $usersData = User::whereIn('user_id', $userIds)->get(); // Retrieve users from the 'users' table

        return response()->json($usersData, 200);
    }
}
