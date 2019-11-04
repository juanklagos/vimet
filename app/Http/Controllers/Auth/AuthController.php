<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response([
                'status' => 'error',
                'message' => 'Credenciales erroneas'
            ], 400);
        }

        $user = $request->user();

        $create_token = $user->createToken('Personal Access Token');

        $token = $create_token->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response([
            'status' => 'success',
            'token' => $create_token->accessToken
        ])
            ->header('Content-Type', 'text/plain')
            ->header('Authorization', $create_token->accessToken);
    }


    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 'success',
            'message' => 'Salida completa'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json(['data' => $request->user()]);
    }
}
