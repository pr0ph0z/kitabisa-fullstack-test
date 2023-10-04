<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuthLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        AuthLog::log('login', $user->id);

        return response()->json([
            'message' => 'Success',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout()
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        $user->tokens()->delete();

        AuthLog::log('logout', $user->id);

        return response()->json([
            'message' => 'Success'
        ]);
    }
}
