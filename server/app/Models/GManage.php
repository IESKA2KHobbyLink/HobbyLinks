<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class GManage extends Model
{
    use HasFactory;

    protected $table = 'g_manages';
    protected $fillable = ['group_id', 'user_id', 'ent_date'];
}
