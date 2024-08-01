<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/tasks/show-done', [TaskController::class, 'getShowDone']);
    Route::post('/tasks/show-done', [TaskController::class, 'setShowDone']);
    Route::post('/tasks/replace', [TaskController::class, 'replace']);
    Route::post('/tasks/collapse', [TaskController::class, 'collapse']);
    Route::post('/tasks/expand', [TaskController::class, 'expand']);

    Route::apiResource('tasks', TaskController::class);
});
