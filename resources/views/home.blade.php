@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Dashboard') }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        {{ __('You are logged in!') }}
                    </div>

                    <div hidden id="api-token" data-token="{{ $token }}"></div>
                </div>

                <div id="tasks" class="my-4">
                </div>

                @vite('resources/js/utils/task.js')
            </div>
        </div>
    </div>
@endsection
