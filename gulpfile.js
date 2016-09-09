var del          = require('del')
var gulp         = require('gulp')
var newer        = require('gulp-newer')
var uglify       = require('gulp-uglify')
var plumber      = require('gulp-plumber')
var htmlmin      = require('gulp-htmlmin')
var imagemin     = require('gulp-imagemin')
var cleanCSS     = require('gulp-clean-css')
var fileInclude  = require('gulp-file-include')
var autoprefixer = require('gulp-autoprefixer')

var paths = {
  js:   { watch: 'assets/js/**/*',  src: 'assets/js/app.js',   dest: 'dist/js' },
  css:  { watch: 'assets/css/**/*', src: 'assets/css/app.css', dest: 'dist/css' },
  img:  { watch: 'assets/img/**/*', src: 'assets/img/**/*',    dest: 'dist/img' },
  stat: { watch: 'public/**/*',     src: 'public/**/*',        dest: 'dist' },
  html: { watch: 'views/**/*',      src: 'views/**/[^_]*',     dest: 'dist' }
}

gulp.task('static', function() {
  return gulp.src(paths.stat.src)
    .pipe(plumber())
    .pipe(newer(paths.stat.dest))
    .pipe(gulp.dest(paths.stat.dest))
})

gulp.task('images', function() {
  return gulp.src(paths.img.src)
    .pipe(plumber())
    .pipe(newer(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
})

gulp.task('scripts', function() {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
})

gulp.task('stylesheets', function() {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(autoprefixer('last 2 version', '> 1%', 'ie 8', 'ie 9'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest))
})

gulp.task('html', function() {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
})

gulp.task('watch', function() {
  gulp.watch(paths.stat.watch, ['static'])
  gulp.watch(paths.img.watch,  ['images'])
  gulp.watch(paths.js.watch,   ['scripts'])
  gulp.watch(paths.css.watch,  ['stylesheets'])
  gulp.watch(paths.html.watch, ['html'])
})

gulp.task('clean', function() { return del(['dist']) })
gulp.task('build', ['static', 'images', 'scripts', 'stylesheets', 'html'])
gulp.task('default', ['build', 'watch'])
