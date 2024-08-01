<?php

namespace App\Http\Requests;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(Request $request): bool
    {
        if ($request['parent_id'] != null) {
            $parentTask = Task::findOrFail($request['parent_id']);
            if (auth()->user()->id != $parentTask['user_id'])
                return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return TaskService::$storeRules;
    }
}
