<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GManage;
use App\Models\User;
use App\Events\ChatMessageEvent;

class GroupChatController extends Controller
{
    //
    public function sendMessage(Request $request)
    {
        // Save the chat message in the database, if needed

        // Broadcast the chat message event to the connected clients in the private channel
        $user = $request->user(); // Assuming you're using Laravel Sanctum for authentication
        $message = $request->message;

        broadcast(new ChatMessageEvent($message, $user))->toOthers();

        return response()->json(['message' => 'Message sent successfully']);
    }
}
