var gulp = require('gulp');
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var less = require('gulp-less');
const conJs = require('gulp-concat');

gulp.task('concat', function () {
  return gulp.src('dev/less/general.less')
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
        }))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

gulp.task('script', function(){
  return gulp.src('dev/js/*.js')
  .pipe(conJs('scripts.js'))
  .pipe(gulp.dest('build/js'));
});

gulp.task('html', function(){
	gulp.src('dev/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('dev/images/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('build/img/sprite/'));
});

gulp.task('default', function(){
	gulp.start('connect','html','concat', 'script');
	gulp.watch(['dev/**/*.html'], function(event){
		gulp.start('html');
	});
	gulp.watch(['dev/less/**/*.less'], function(event){
		gulp.start('concat');
  });	
  gulp.watch(['dev/js/*.js'], function(event){
		gulp.start('script');
	});
});