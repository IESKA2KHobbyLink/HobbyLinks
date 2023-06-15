<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    //
    public function index()
    {
        $events = Event::all();
        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $new_event = Event::create($request->all());
        return response()->json($new_event, 201);
    }

    public function show(string $id)
    {
        $events = Event::find($id);
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
