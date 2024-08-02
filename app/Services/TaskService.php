<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Arr;

class TaskService
{
    public static function updateDescendants(Task $task, array $values)
    {
        return $task->descendants()->update($values);
    }

    public static function updateCollapsed(bool $value)
    {
        $user = auth()->user();
        return $user->tasks()->update(['collapsed' => $value]);
    }

    public static function replace($tasksData)
    {
        foreach ($tasksData as $taskData) {
            $updateData = Arr::only($taskData, ['parent_id', 'order']);

            $task = Task::findOrFail($taskData['id']);
            $user = auth()->user();

            if ($taskData['parent_id']) {
                $parentTask = Task::findOrFail($taskData['parent_id']);
                if (!$user->canManageTask($parentTask))
                    return abort(403);
            }

            if (!$user->canManageTask($task))
                return abort(403);

            $task->update($updateData);
        }
    }

    public static $storeRules = [
        'parent_id' => 'nullable|integer',
        'title' => 'required|string',
        'description' => 'nullable|string'
    ];

    public static $updateRules = [
        'parent_id' => 'nullable|integer',
        'title' => 'string',
        'description' => 'nullable|string',
        'collapsed' => 'boolean',
        'done' => 'boolean'
    ];

    public static $replaceRules = [
        'data' => 'required|array',
        'data.*.id' => 'required|integer',
        'data.*.parent_id' => 'nullable|integer',
        'data.*.order' => 'required|integer',
    ];
}