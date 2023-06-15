<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    //
    public function index()
    {
        $groups = Group::all();
        return response()->json($groups, 200);
    }

    public function store(Request $request)
    {
        $new_group = Group::create($request->all());
        return response()->json($new_group, 201);
    }

    public function show(string $id)
    {
        $group = Group::find($id);
        return response()->json($group, 200);
    }

    public function update(Request $request, string $id)
    {
        $group = Group::find($id);
        $group->update($request->all());
        return response()->json($group);
    }

    public function destroy(string $id)
    {
        $group = Group::find($id);
        $group->delete();
        return response()->json(null, 204);
    }
}
