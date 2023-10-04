<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthLog extends Model
{
    use HasFactory;
    protected $fillable = ['type', 'user_id'];

    public static function log(string $type, $userId = null)
    {
        self::create(['type' => $type, 'user_id' => $userId]);
    }
}
