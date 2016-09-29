var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

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

gulp.task("start", function() {
  nodemon({
    script: "cli.js",
    ext: "js",
    tasks: ["babel"],
    ignore: ["node_modules", "lib"]
  })
});

gulp.task("default", ["watch"]);