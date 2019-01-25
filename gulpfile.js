var gulp = require("gulp");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
// var cleanCSS = require('gulp-clean-css')
// var concat = require('gulp-concat')
var prefix = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var browserSync = require("browser-sync").create();

var isProduction = false;

var paths = {
  styles: {
    src: "src/sass/**/*.scss",
    dest: "dist/styles"
  },
  pug: {
    src: "src/pug/*.pug",
    watch: "src/pug/**/*.pug",
    dest: "dist"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/scripts"
  },
  images: {
    src: ["src/img/**/*.jpg", "src/img/**/*.JPG", "src/img/**/*.png", "src/img/**/*.ico", "src/img/**/*.json"],
    dest: "dist/images"
  },
  fonts: {
    src: "src/fonts/**/*",
    dest: "dist/fonts"
  }
}

var sassOptions = {
  outputStyle: "expanded"
};

var prefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('pug', function() {
  var stream = gulp.src(paths.pug.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest));
  return stream;
});

gulp.task('styles', function() {
  var stream = gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
  return stream;
});

gulp.task('scripts', function() {
  var stream = gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
  return stream;
});

gulp.task('images', function() {
  var stream = gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  return stream;
});

gulp.task('fonts', function() {
  var stream = gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
  return stream;
});

gulp.task('browser', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(paths.pug.watch, { usePolling: true, interval: 250 }, gulp.parallel('pug'))
    .on('change', browserSync.reload);

  // watch and rebuild .js files
  gulp.watch(paths.scripts.src, { usePolling: true, interval: 250 }, gulp.parallel('scripts'))
    .on('change', browserSync.reload);
 
  // watch and rebuild .css files
  gulp.watch(paths.styles.src, { usePolling: true, interval: 250 }, gulp.parallel('styles'))
    .on('change', browserSync.reload);
 
  // Reload when html changes
  gulp.watch(paths.images.src, { usePolling: true, interval: 250 }, gulp.parallel('images'))
    .on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean',
  gulp.parallel(
    'pug',
    'fonts',
    'styles',
    'scripts',
    'images')));

gulp.task('serve', gulp.series('clean',
  gulp.parallel(
    'pug',
    'fonts',
    'styles',
    'scripts',
    'images'),
  'browser'));

gulp.task('default', gulp.series('serve'));