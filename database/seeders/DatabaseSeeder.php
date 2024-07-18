<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $tasks = Task::factory(10)->create(['user_id' => $user]);

        foreach ($tasks as $task) {
            for ($i = 0; $i < 3; $i++)
                Task::factory()->create(['parent_id' => $task['id'], 'user_id' => $user]);
        }
    }
}
