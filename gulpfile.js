// include gulp
var gulp = require('gulp'); 

// include plug-ins
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');


// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*',
      imgDst = './build/img';
 
  gulp.src(imgSrc)
    .pipe( plumber() )
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe( plumber() )
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// Uglify JS
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('./build/scripts/js'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe( plumber() )
        .pipe(sass())
        .pipe(gulp.dest('./build/styles/'));
});

// Copies all fonts.
//
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
    .pipe( plumber() )
    .pipe( flatten() )
    .pipe( gulp.dest( './build/fonts/' ) );
});

// Watch files
gulp.task('watch', function(event) {
    gulp.watch('./src/*.html', ['htmlpage']);
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/img/**/*', ['imagemin']);
    gulp.watch('./src/fonts/**/*', ['fonts']);
    gulp.watch('./src/js/*.js', ['js']);
});


// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'js', 'sass', 'fonts', 'watch'], function() {
});