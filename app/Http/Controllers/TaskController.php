<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\ShowDoneRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return $user->tasks()->orderBy('done')->orderBy('order')->tree()->get()->toTree();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $user = auth()->user();
        $request['user_id'] = $user->id;

        if ($request['parent_id'] != null) {
            $parentTask = Task::findOrFail($request['parent_id']);
            if ($user->id != $parentTask['user_id'])
                return abort(403, 'Unauthorized action.');
            if ($parentTask['done'])
                return 0;
        }

        return Task::create($request->toArray());
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
        if ($request->exists('done'))
            static::updateDescendants($task, ['done' => $request['done']]);
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

    public function replace(Request $request)
    {
        $tasksData = $request->get('data');
        foreach ($tasksData as $taskData) {
            $updateData = Arr::only($taskData, ['parent_id', 'order']);
            $task = Task::findOrFail($taskData['id']);
            if (auth()->user()->id != $task['user_id'])
                return abort(403, 'Unauthorized action.');
            $task->update($updateData);
        }
        return true;
    }

    public function collapse()
    {
        $user = auth()->user();
        return $user->tasks()->update(['collapsed' => true]);
    }

    public function expand()
    {
        $user = auth()->user();
        return $user->tasks()->update(['collapsed' => false]);
    }

    public function getShowDone()
    {
        return auth()->user()->show_done;
    }

    public function setShowDone(ShowDoneRequest $request)
    {
        return auth()->user()->update($request->validated());
    }

    private static function updateDescendants(Task $task, array $values)
    {
        return $task->descendants()->update($values);
    }
}
