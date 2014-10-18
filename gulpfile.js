var gulp = require('gulp')
  , watch = require('gulp-watch')
  , clean = require('gulp-clean')
  , connect = require('gulp-connect')
  , sass = require('gulp-ruby-sass')
  , bases;

bases = {
 src: 'src/',
 dist: 'dist/'
};

/**
 * Clean dist directory. read: false make this task faster
 */
gulp.task('clean', function () {
  return gulp.src(bases.dist, {read: false})
  .pipe(clean());
});

/**
 * Process index file
 */
gulp.task('process_html', function () {
  gulp.src(bases.src + 'index.html')
    .pipe(gulp.dest(bases.dist));
});

/**
 * Process index file
 */
gulp.task('copy_highlight', function () {
  gulp.src(bases.src + 'highlight-styles/github.css')
    .pipe(gulp.dest(bases.dist + 'css'));
  gulp.src(bases.src + 'js/highlight.pack.js')
    .pipe(gulp.dest(bases.dist + 'js'));
});

/**
 * Manipulate Sass files to generate css
 */
gulp.task('styles', function() {
  return gulp.src('src/styles/app.sass')
    .pipe(sass({
      sourcemapPath: '../src/styles'
    }))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Development server with API proxy
 */
gulp.task('webserver', function() {
  connect.server({
    root: bases.dist
  , port: 8000
  , fallback: 'dist/index.html'
  });
});

/**
 * Watch for changes on js/sass
 */
gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.sass', ['styles']);
  gulp.watch('./src/index.html', ['process_html']);
});

gulp.task('default', ['clean', 'process_html', 'copy_highlight', 'styles', 'webserver', 'watch']);
