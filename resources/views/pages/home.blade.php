@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div hidden id="api-token" data-token="{{ $token }}"></div>
                <div class="d-flex justify-content-between flex-column flex-md-row border border-secondary shadow-sm border-top-0 p-3 px-5"
                    id="home-header">
                    <h1 class="m-0">Задачи</h1>
                    <div>
                        <button type="button" class="btn btn-secondary" id="new-task-btn">
                            <i class="bi bi-file-earmark-plus"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" id="expand-all-btn">
                            <i class="bi bi-arrows-expand"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" id="collapse-all-btn">
                            <i class="bi bi-arrows-collapse"></i>
                        </button>
                        <div class="dropdown btn p-0">
                            <button type="button" class="btn btn-secondary" id="settings-btn" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="bi bi-gear"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li class="px-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="show-done-btn">
                                        <label class="form-check-label" for="show-done-btn">Отображать
                                            выполненные</label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <ul id="tasks" class="m-2 p-2 sublist">
                </ul>
                <ul></ul>
                @vite('resources/js/pages/home.js')
            </div>
        </div>
    </div>
@endsection
