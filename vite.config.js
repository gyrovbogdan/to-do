import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.js",
                "resources/sass/app.scss",
                "resources/js/pages/home.js",
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            $: "jquery",
            jquery: "jquery",
        },
    },
});
