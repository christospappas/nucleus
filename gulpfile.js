var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');
var qunit = require('node-qunit-phantomjs');
var del = require('del');

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('dist', ['clean'], function() {
  return gulp.src(['src/nucleus.js'])
    .pipe(named())
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.js$/, 
            exclude: /node_modules|bower_components/,
            loader: "babel-loader"
          }
        ],
      },
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function() {
  return qunit('test/test-runner.html');
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['dist', 'test']);
});

gulp.task('default', ['watch', 'dist']);