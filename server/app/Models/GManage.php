<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GManage extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'g_manages';
    protected $fillable = ['group_id', 'user_id'];
}
