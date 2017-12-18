var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var data = require('gulp-data');
var fs = require('fs');
var data_module = require('./data_module');



gulp.task('scss',function(){
    gulp.src(['css/src/app.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('css/dist'))
});
gulp.task('js',function(){
    gulp.src(['js/src/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('js/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist'))
});
gulp.task('jade',function(){
    gulp.src(['html/pages/*.jade'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(data(function(file) {
                  var data_news = JSON.parse(JSON.stringify(data_module.getDataNews()));
                  var data_gallery = JSON.parse(JSON.stringify(data_module.getDataGallery()));
                  var data_interests = JSON.parse(JSON.stringify(data_module.getDataInterests()));
                  var data_shedule = JSON.parse(JSON.stringify(data_module.getDataShedule()));
                  var data = {"news": data_news, "gallery": data_gallery, "interests": data_interests, "shedule": data_shedule
              };
                
                  //console.log(data);
                  /*
                  for (var i = 1; i < Object.keys(data['news']['data_news']).length + 1; i++)
                  console.log(data['news']['data_news'][i.toString()]['image']);
                  */
                  return data;

                       
                       

                } )) 
        .pipe(jade({

        }))
        .pipe(gulp.dest('./'))
});
gulp.task('default',function(){
    gulp.watch('js/src/**/*.js',['js']);
    gulp.watch('css/src/**/*.scss',['scss']);
    gulp.watch('html/**/*.jade',['jade']);
});