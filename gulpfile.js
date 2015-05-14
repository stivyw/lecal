var gulp = require("gulp");
var shell = require("gulp-shell");
var elixir = require("laravel-elixir");

elixir.extend("speak", function(message) {

    gulp.task("speak", function() {
        gulp.src("").pipe(shell("echo " + message));
    });

    return this.queueTask("speak");

 });

elixir(function(mix) {
    mix.speak("Tea, Earl Grey, Hot");
});