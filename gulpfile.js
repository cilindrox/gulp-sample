'use strict';

// Main dependencies and plugins
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

var assets = 'assets/js/**/*.js';
var publicDir = 'public/javascripts';

// Lint Task
gulp.task('lint', function () {
  return gulp.src(assets)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate and minify all JS files
gulp.task('scripts', function () {
  return gulp.src(assets)
    .pipe(concat('global.js'))
    .pipe(gulp.dest(publicDir))
    .pipe(rename('global.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(publicDir));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(assets, ['lint', 'scripts']);
});

gulp.task('demon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

// Default Task
gulp.task('default', ['demon']);
