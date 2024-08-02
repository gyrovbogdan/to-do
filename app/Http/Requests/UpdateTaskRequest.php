<?php

namespace App\Http\Requests;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this['parent_id']) {
            $parentTask = Task::findOrFail($this['parent_id']);
            if ($this->user()->canManageTask($parentTask))
                return false;
        }
        return $this->user()->canManageTask($this->task);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return TaskService::$updateRules;
    }
}
