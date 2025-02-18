<?php

namespace App\Http\Requests;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this['parent_id'] != null) {
            $parentTask = Task::findOrFail($this['parent_id']);
            return $this->user()->canManageTask($parentTask);
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
