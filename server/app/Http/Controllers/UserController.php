<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use App\Models\Group;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = User::create($request->all());

        if ($request->hasFile('image')) {
            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 画像ファイルの制約を指定する
            ];

            $file = $request->file('image');

            $request->validate($rules);

            $fileName = time() . '_' . $file->getClientOriginalName();

            $disk = 'local';

            $path = $file->storeAs('public/images/profile_pic', $fileName, $disk);

            $publicPath = Storage::url($path);

            $user->profile_Pic = $publicPath;

            $user->save();
        }


        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->fill($request->all()); // Use fill() instead of update() to assign the values

        $user->save();

        return response()->json($user, 200);
    }


    /**
     * Remove the specified resource from storage.
     **/

    public function destroy(string $id)
    {
        //
        $user = User::find($id);
        $user->delete();
        return response()->json('user deleted', 204);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }


        return $request->user();
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }

    public function queryUsercreatedGroups(string $user_id)
    {
        $groups = Group::where('created_by', $user_id)->get();
        return response()->json($groups, 200);
    }
}
