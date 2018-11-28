const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    lazy: true,
  }),
  browserSync = require('browser-sync'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  webpackConfig = require('./webpack.config.js');


gulp.task('css', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: ['./node_modules'],
    }))
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer('last 4 versions'))
    .pipe(plugins.combineMq({
      beautify: false
    }))
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  gulp.src('src/assets/js/main.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
});

gulp.task("server", function () {

  browserSync.init({
    proxy: "http://wp-boilerplate.test"
  });

});

gulp.task("watch", function () {

  gulp.watch('src/sass/**/*.scss', ["css"]);
  gulp.watch('src/assets/js/**/*.js', ['js']);
  gulp.watch("*.php", browserSync.reload);

});

gulp.task("default", ["watch", "css", "js", "server"]);