var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

//removes old sprite folder when updating the sprites
gulp.task('beginClean',function(){
    
   return del(['./app/temp/sprite', './app/assets/images/sprites']);
    
});

//will not begin until clean function performed, stops duplicate sprite files being made
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

//auto generated assets get moved so we dont need temp prites folder, this removes it. keeps it clean but not essential
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    
   return del('./app/temp/sprite');
    
});

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS','endClean']);