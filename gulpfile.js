'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
let uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync');

let path = {
    src_sass:'./src/scss/*.scss',
    src_js:'./src/js/index.js',
}

gulp.task("sassTask", function() {
    return gulp
        .src(path.src_sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('jsTask', function() {
    return gulp
      .src(path.src_js)
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream());
  });


gulp.task('serve', gulp.series('sassTask', function() {
    browserSync.init({
        server: "./dist"   
    });
  
    gulp.watch(path.src_sass,
      gulp.series('sassTask'));

    gulp.watch(path.src_js,
      gulp.series("jsTask"));

    gulp.watch("./dist/*.html").on('change', browserSync.reload);
  }));
  
  gulp.task('default',
    gulp.series('sassTask', "jsTask", 'serve'));