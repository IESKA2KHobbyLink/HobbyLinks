<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'groups';
    protected $primaryKey = 'group_id';

    protected $fillable = [
        'group_name',
        'created_by',
        'people_limit',
        'category_id'
    ];
}
