@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div hidden id="api-token" data-token="{{ $token }}"></div>
                <h1>Ваши задачи</h1>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-dark" id="new-task-btn">
                        <i class="bi bi-journal-plus"></i> Новая задача
                    </button>
                    <button type="button" class="btn btn-outline-dark" id="expand-all-btn">
                        <i class="bi bi-plus-square-fill"></i> Развернуть все
                    </button>
                    <button type="button" class="btn btn-outline-dark" id="collapse-all-btn">
                        <i class="bi bi-dash-square-fill"></i> Свернуть все
                    </button>
                </div>
                <ul id="tasks" class="my-2 sublist">
                </ul>
                <h2>Выполнено</h2>
                <ul id="tasks-done" class="my-4">
                </ul>
                @vite('resources/js/pages/home.js')
            </div>
        </div>
    </div>
@endsection
