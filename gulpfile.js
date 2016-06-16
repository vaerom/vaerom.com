var del      = require('del')
var gulp     = require('gulp')
var newer    = require('gulp-newer')
var concat   = require('gulp-concat')
var uglify   = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var cleanCSS = require('gulp-clean-css')

var paths = {
  js:   { src: 'assets/js/**/*',  dest: 'build/js' },
  css:  { src: 'assets/css/**/*', dest: 'build/css' },
  img:  { src: 'assets/img/**/*', dest: 'build/img' },
  stat: { src: ['views/**/*', 'public/**/*'], dest: 'build' }
}

gulp.task('static', function() {
  return gulp.src(paths.stat.src)
    .pipe(newer(paths.stat.dest))
    .pipe(gulp.dest(paths.stat.dest))
})

gulp.task('images', function() {
  return gulp.src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
})

gulp.task('scripts', function() {
  return gulp.src(paths.js.src)
    .pipe(newer(paths.js.dest + '/app.js'))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.js.dest))
})

gulp.task('stylesheets', function() {
  return gulp.src(paths.css.src)
    .pipe(newer(paths.css.dest + '/app.css'))
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.css.dest))
})

gulp.task('watch', function() {
  gulp.watch(paths.stat.src, ['static'])
  gulp.watch(paths.img.src,  ['images'])
  gulp.watch(paths.js.src,   ['scripts'])
  gulp.watch(paths.css.src,  ['stylesheets'])
})

gulp.task('clean', function() { return del(['build']) })
gulp.task('build', ['static', 'images', 'scripts', 'stylesheets'])
gulp.task('default', ['watch', 'build'])
