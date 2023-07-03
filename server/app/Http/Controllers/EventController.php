<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EManage;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    //
    public function index()
    {
        $events = Event::all();
        foreach ($events as $event) {
            $users = EManage::where('event_id', $event->event_id)->get();
            $groupName = Group::find($event->group_id)->group_name;
            $event->attendeeCount = count($users);
            $event->group_name =  $groupName;
        }
        return response()->json($events, 200);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'event_name' => 'required',
            'desc' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'created_by' => 'required',
            'group_id' => 'required',
            'prefecture' => 'required',
            'address' => 'required',
            'type' => 'required',
            'date' => 'required',


        ]);
        $new_event = Event::create([
            'event_name' => $validatedData['event_name'],
            'desc' => $validatedData['desc'],
            'type' => $validatedData['type'],
            'created_by' => $validatedData['created_by'],
            'group_id' => $validatedData['group_id'],
            'prefecture' => $validatedData['prefecture'],
            'address' => $validatedData['address'],
            'date' => $validatedData['date'],
        ]);
        $file = $request->file('image');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $disk = 'local';

        // Save the file to the specified location
        $path = $file->storeAs('public/images/eventHeader', $fileName, $disk);

        // Create a symbolic link
        $publicPath = Storage::url($path);

        $new_event->header_path = $publicPath;
        $new_event->save();

        $emanage = EManage::create([
            'event_id' => $new_event->event_id,
            'user_id' => $new_event->created_by,
            'group_id' => $new_event->group_id

        ]);
        return response()->json(['new_event' => $new_event, 'emanage' =>  $emanage], 201);
    }

    public function show(string $id)
    {
        $events = Event::find($id);
        $group = Group::find($events->group_id);
        $groupName = $group->group_name;
        $events->group_name = $groupName;
        $userName = User::find($events->created_by)->user_name;
        $events->owner = $userName;
        return response()->json($events, 200);
    }

    public function update(Request $request, string $id)
    {
        $events = Event::find($id);
        $events->update($request->all());
        return response()->json($events);
    }

    public function destroy(string $id)
    {
        $events = Event::find($id);
        $events->delete();
        return response()->json(null, 204);
    }
}
