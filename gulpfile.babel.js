var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var qunit = require('node-qunit-phantomjs');
 
function compile(watch) {
  var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));
 
  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }
 
  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
      test();
    });
  }
 
  rebundle();
}
 
function watch() {
  return compile(true);
};

function test() {
	return qunit('test/test-runner.html');
}
 
gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });
gulp.task('test', function() { return test(); });
 
gulp.task('default', ['watch']);