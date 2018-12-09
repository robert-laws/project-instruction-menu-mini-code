var gulp = require("gulp");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var browserSync = require("browser-sync");

var paths = {
  styles: {
    src: "src/sass/**/*.scss",
    dest: "build/styles"
  },
  pug: {
    src: "src/pug/*.pug",
    watch: "src/pug/**/*.pug",
    dest: "build"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "build/scripts"
  },
  images: {
    src: ["src/images/**/*.jpg", "src/images/**/*.JPG", "src/images/**/*.png", "src/images/**/*.ico", "src/images/**/*.svg"],
    dest: "build/img"
  }
}

var sassOptions = {
  outputStyle: "expanded"
};

var prefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task("pug", function() {
  return gulp.src(paths.pug.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream())    
});

gulp.task("sass", function() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
});

gulp.task("images", function() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
});

gulp.task("clean", function() {
  return del(["build"])
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  gulp.watch(paths.styles.src, ["sass"]);
  gulp.watch(paths.pug.watch, ["pug"]);
  gulp.watch(paths.scripts.src, ["scripts"]);
  gulp.watch(paths.images.src, ["images"]);
});

gulp.task("build", ["sass", "pug", "scripts", "images"]);

gulp.task("default", ["sass", "pug", "scripts", "images", "watch"]);