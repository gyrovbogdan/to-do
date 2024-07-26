@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div hidden id="api-token" data-token="{{ $token }}"></div>
                <h1>Ваши задачи</h1>
                <ul id="tasks" class="my-4">
                </ul>
                <h2>Выполнено</h2>
                <ul id="tasks-done" class="my-4">
                </ul>
                @vite('resources/js/pages/home.js')
            </div>
        </div>
    </div>
@endsection
