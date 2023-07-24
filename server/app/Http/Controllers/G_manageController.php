<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GManage;
use App\Models\EManage;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class G_manageController extends Controller
{
    //
    public function addUserToGroup(Request $request)
    {
        $validatedData = $request->validate([
            'group_id' => 'required|exists:groups,group_id',
            'user_id' => 'required|exists:users,user_id'
        ]);

        $gmanage =  GManage::create($validatedData);
        $userIds = $gmanage->user_id;
        $usersData = User::find($userIds); // Retrieve users from the 'users' table
        return response()->json(['message' => 'User added to group successfully', 'gmanage' => $gmanage, 'usersData' => $usersData], 200);
    }

    public function removeUserFromGroup(Request $request)
    {
        $validatedData = $request->validate([
            'group_id' => 'required|exists:g_manages,group_id',
            'user_id' => 'required|exists:g_manages,user_id'
        ]);

        GManage::where($validatedData)->delete();
        return response()->json('User removed from group successfully', 200);
    }

    public function queryUserInGroup($groupId)
    {
        //SELECT * FROM users WHERE id IN ( SELECT user_id FROM gmanages WHERE group_id = $groupId);
        $users = GManage::where('group_id', $groupId)->get();
        $userIds = $users->pluck('user_id')->toArray(); // Extract user IDs from the result
        $usersData = User::whereIn('user_id', $userIds)->get(); // Retrieve users from the 'users' table

        // $usersData = DB::select("
        // SELECT * FROM users WHERE user_id IN (
        //     SELECT user_id FROM g_manages WHERE group_id = ?
        // )", [$groupId]);

        return response()->json($usersData, 200);
    }

    public function showEvent($groupId)
    {
        //$group = Group::find($id);
        //$user = User::find($group->created_by);
        //$group->owner = $user->user_name;
        $event = Event::where('group_id', $groupId)->get();
        //$group->memberCount = count($users);

        return response()->json($event, 200);
    }
}
