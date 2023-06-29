<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'events';
    protected $primaryKey = 'event_id';
    protected $fillable = ['event_name', 'prefecture', 'address', 'created_by', 'type', 'header_Url', 'desc', 'date', 'group_id'];
}
