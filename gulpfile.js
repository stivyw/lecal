var gulp = require("gulp");
var shell = require("gulp-shell");
var elixir = require("laravel-elixir");

elixir(function (mix) {
  mix.scripts([
    "app.js"
  ], "dist/all.js", "src/js/");
});