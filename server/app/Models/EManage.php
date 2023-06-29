<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class EManage extends Model
{
    use HasFactory;


    protected $table = 'e_manages';
    protected $fillable = ['event_id', 'user_id', 'group_id'];
}
