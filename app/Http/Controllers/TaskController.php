<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Arr;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return $user->tasks()->tree()->get()->toTree();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $user = auth()->user();
        $request['user_id'] = $user->id;

        if ($request['parent_id'] != null)
            $task = Task::findOrFail($request['parent_id']); {
            if ($user->id != $task['user_id'])
                return abort(403, 'Unauthorized action.');
        }

        return Task::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if (auth()->user()->id != $task['user_id'])
            return abort(403, 'Unauthorized action.');
        return $task->descendantsAndSelf()->get()->toTree();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if (auth()->user()->id != $task['user_id'])
            return abort(403, 'Unauthorized action.');
        return $task->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (auth()->user()->id != $task['user_id'])
            return abort(403, 'Unauthorized action.');
        return $task->descendantsAndSelf()->delete();
    }
}
