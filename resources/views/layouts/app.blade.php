<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"data-bs-theme='dark'>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>

<body class="d-flex flex-column vh-100">
    <header>
        @include('layouts.parts.navbar')
    </header>

    <main class="flex-shrink-0">
        @yield('content')
    </main>

    <footer class="mt-auto">
        @include('layouts.parts.footer')
    </footer>
</body>

</html>
