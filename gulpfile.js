const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

/*
  -- TOP LEVEL FUNCTIONS 
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/




// Copy All HTML files
gulp.task('copyHtml', function(){
  return gulp.src('src/pages/*.html')
      .pipe(gulp.dest('dist/pages'));
});


// Compile Sass
gulp.task('sass', function(){
 return gulp.src('src/sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});


// Scripts
gulp.task('pluginsScripts', function(){
 return gulp.src('src/libs/**/*.js')
      .pipe(concat('plugins.bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/libs'));
});

// Scripts
gulp.task('pluginsStyles', function(){
 return gulp.src('src/libs/**/*.css')
      .pipe(concat('plugins.bundle.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('dist/libs'));
});


gulp.task('default',  gulp.series('pluginsScripts','pluginsStyles', 'sass', 'scripts','copyHtml'));

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/sass/*.scss',gulp.series('sass'));
  gulp.watch('src/libs/**/*.js', gulp.series('pluginsScripts'));
  gulp.watch('src/libs/**/*.css', gulp.series('pluginsStyles'));
  gulp.watch('src/pages/**/*.html', gulp.series('copyHtml'));
});