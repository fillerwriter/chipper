var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task("babel", function () {
  return gulp.src("src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("lib"));
});

gulp.task("watch", function() {
  return watch("src/**/*.js", function(error) {
    return gulp.src("src/**/*.js")
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest("lib"));
  });
});

gulp.task("default", ["watch"]);