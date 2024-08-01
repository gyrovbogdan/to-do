<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyTaskRequest;
use App\Http\Requests\ReplaceTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\ShowDoneRequest;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = auth()->user()->tasks();
        return $tasks->orderBy('done')->orderBy('order')
            ->orderBy('created_at')->tree()->get()->toTree();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $request->validated();
        $task['user_id'] = auth()->user()->id;
        return Task::create($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if ($request->exists('done'))
            TaskService::updateDescendants($task, ['done' => $request->validated('done')]);
        $task->update($request->validated());
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyTaskRequest $request, Task $task)
    {
        return $task->descendantsAndSelf()->delete();
    }

    public function replace(ReplaceTaskRequest $request)
    {
        $tasksData = $request->validated('data');
        return TaskService::replace($tasksData);
    }

    public function collapse()
    {
        return TaskService::updateCollapsed(true);
    }

    public function expand()
    {
        return TaskService::updateCollapsed(false);
    }

    public function getShowDone()
    {
        return auth()->user()->show_done;
    }

    public function setShowDone(ShowDoneRequest $request)
    {
        return auth()->user()->update($request->validated());
    }


}
