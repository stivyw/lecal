var gulp = require('gulp');
//var pathModule = require('path');
var resolveDependencies = require('gulp-resolve-dependencies');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var conf = require('./cfg');
var globToVinyl = require('glob-to-vinyl');

function compileScript(file) {
  gulp
    .src(file)
    .pipe(resolveDependencies({
      pattern: /\* @require [\s-]*(.*?\.js)/g,
      log: true
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
  ;
};

gulp.task('build', function() {
  globToVinyl('src/js/*.js', function(err, files){
    for (var file in files) {
      compileScript(files[file].path);
    }
  });
});
gulp.task('hello', function hello () {
  console.log(conf('sass.development'));
})
gulp.task('default', ['hello']);