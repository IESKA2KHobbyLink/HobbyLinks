<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GManage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    //
    public function index()
    {
        $groups = Group::all();
        foreach ($groups as $group) {
            $users = GManage::where('group_id', $group->group_id)->get();
            $group->memberCount = count($users);
        }
        return response()->json($groups, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'group_name' => 'required',
            'desc' => 'required',
            'prefecture' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'created_by' => 'required',
            'category_id' => 'required',
            'people_limit' => 'required',
        ]);
        $new_group = Group::create([
            'group_name' => $validatedData['group_name'],
            'desc' => $validatedData['desc'],
            'category_id' => $validatedData['category_id'],
            'created_by' => $validatedData['created_by'],
            'prefecture' => $validatedData['prefecture'],
            'people_limit' => $validatedData['people_limit']
        ]);

        $file = $request->file('image');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $disk = 'local';

        // Save the file to the specified location
        $path = $file->storeAs('public/images/groupHeader', $fileName, $disk);

        // Create a symbolic link
        $publicPath = Storage::url($path);

        $new_group->header_path = $publicPath;
        $new_group->save();
        //g_manages テーブル挿入

        $gmanage = GManage::create([
            'group_id' => $new_group->group_id,
            'user_id' => $new_group->created_by
        ]);

        return response()->json(['new_group' => $new_group, 'gmanage' =>  $gmanage], 201);
    }

    public function show(string $id)
    {
        $group = Group::find($id);
        $user = User::find($group->created_by);
        $group->owner = $user->user_name;
        $users = GManage::where('group_id', $group->group_id)->get();
        $group->memberCount = count($users);

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

    //検索メソッド
    public function search(Request $request)
    {
        // 検索条件をリクエストから取得
        $keyword = $request->input('keyword');

        // 検索ロジックの実装
        $results = Group::where('group_name', 'like', '%' . $keyword . '%')->get();

        // 必要な場合は認証や権限管理をチェック

        // 検索結果を返す
        return response()->json($results);
    }
}
