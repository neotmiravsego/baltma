"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var jsmin = require("gulp-jsmin");
var server = require("browser-sync").create();

gulp.task("css", function() {
  return gulp
    .src("src/styles/template_style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(
      sass({
        includePaths: require("node-normalize-scss").includePaths
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("public/local/templates/site/"))
    .pipe(csso())
    .pipe(rename("template_style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("public/local/templates/site/"))
    .pipe(server.stream());
});

gulp.task("html", function() {
  return gulp
    .src("src/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("public"));
});

// переделать позже

gulp.task("jsmin", async function() {
  return gulp
    .src(["src/js/*.js", "!src/js/*min.js"])
    .pipe(jsmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/local/templates/site/js"));
});

gulp.task("images", function() {
  return gulp
    .src(["src/img/**/*.{png,jpg,svg,ico}"])
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      ], {
          verbose: true
      })
    )
    .pipe(gulp.dest("public/local/templates/site/img/"));
});

gulp.task("images-fast", function() {
    return gulp
        .src(["src/img/**/*.{png,jpg,svg,ico}"])
        .pipe(gulp.dest("public/local/templates/site/img/"));
});

gulp.task("copy", function() {
  return gulp
    .src(["src/**/*.{ttf,woff,woff2}", "src/**/*.js"])
    .pipe(gulp.dest("public/local/templates/site/"));
});

// пока не делаем
// gulp.task("webp", function() {
//   return gulp
//     .src("source/img/**/*.{png,jpg}")
//     .pipe(webp({ quality: 90 }))
//     .pipe(gulp.dest("build/img/webp"));
// });

gulp.task("sprite", function() {
  return gulp
    .src("src/img/svg-sprite/**/*.svg")
    .pipe(
      svgstore({
        inLineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("public/local/templates/site/img/"));
});

gulp.task("clean", function() {
  return del([
    "public/local/templates/site/**",
    "public/local/templates/site/*",
    "!public/local/templates/site",
    "!public/local/templates/site/.git",
    "!public/local/templates/site/.gitignore",
    "public/*.html"
  ]);
});

gulp.task("server", function() {
  server.init({
    server: "public/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/styles/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/js/**/*.js", gulp.series("jsmin", "refresh"));
  gulp.watch("src/img/**/*.{png,jpg,svg}", gulp.series("images-fast", "refresh"));
  gulp.watch("src/img/**/*.svg", gulp.series("sprite", "html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task(
  "start",
  gulp.series(
    "clean",
    "images",
    "sprite",
    "css",
    "copy",
    "jsmin",
    "html",
    "server"
  )
);

gulp.task(
    "start",
    gulp.series(
        "clean",
        "images-fast",
        "sprite",
        "css",
        "copy",
        "jsmin",
        "html",
        "server"
    )
);

gulp.task(
  "build",
  gulp.series("clean", "images", "sprite", "css", "copy", "jsmin", "html")
);
