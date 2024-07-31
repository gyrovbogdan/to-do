<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $token = auth()->user()->createToken('api-token')->plainTextToken;
        return view('pages/home', compact('token'));
    }

    public function done()
    {
        $token = auth()->user()->createToken('api-token')->plainTextToken;
        return view('pages/done', compact('token'));
    }
}
