// Include gulp 
const {
	src,
	dest,
	series,
	parallel
} = require('gulp');

// Include plugins 
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var htmlReplace = require('gulp-html-replace');
var replace = require('gulp-replace');

var buildPath = 'dist/';
var srcPath = 'src/';
var time = new Date().getTime()

// Erases the dist folder
function clean() {
	return del(buildPath);
}
// vendor.min.js 
function jsVendor() {
	return src([
			srcPath + 'assets/js/vendor/jquery-1.12.4.min.js',
			srcPath + 'assets/js/vendor/gsap.min.js',
			srcPath + 'assets/js/vendor/swiper.min.js',
			srcPath + 'assets/js/vendor/NPIXEL.libs.js'
		])
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(dest(buildPath + 'assets/js/vendor'))
}
// main.min.js
function jsMain() {
	return src([
			srcPath + 'assets/js/main.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest(buildPath + 'assets/js'))
}
// Move image files 
function images() {
	return src(srcPath + 'assets/images/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		})))
		.pipe(dest(buildPath + 'assets/images'));
}
// Compile SASS
function sassCompile() {
	return src([
			srcPath + 'assets/scss/desktop.scss',
			srcPath + 'assets/scss/mobile.scss'
		])
		// Initialize sourcemaps before compilation starts
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on("error", sass.logError)
		// Use postcss with autoprefixer and compress the compiled file using cssnano
		.pipe(postcss([autoprefixer(), cssnano()]))
		// Now add/write the sourcemaps
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest(buildPath + 'assets/css'))
}
// Index file copy
function copyIndex() {
	return src([srcPath + 'index.html'])
		.pipe(htmlReplace({
			'js': ['./assets/js/vendor/vendor.min.js?v='+time, './assets/js/main.min.js?v='+time]
		}))
		.pipe(replace('.css', '.css?v='+time))
		.pipe(dest(buildPath))
}
// Root file copy
function copyRoot() {
	return src([
			srcPath + '404.html',
			srcPath + '500.html',
			srcPath + 'robots.txt',
			srcPath + 'sitemap.xml'
		])
		.pipe(dest(buildPath))
}
// Favicon folder copy
function copyFavicon() {
	return src(srcPath + 'favicon/*')
		.pipe(dest(buildPath+'favicon'))
}
// Js file copy
function copyJs() {
	return src([srcPath + 'assets/js/vendor/detectizr.min.js'])
		.pipe(dest(buildPath + 'assets/js/vendor/'))
}
// Font file copy
function copyFont() {
	return src([srcPath + 'assets/fonts/*'])
		.pipe(dest(buildPath + 'assets/fonts/'))
}
// Video file copy
function copyVideo() {
	return src([srcPath + 'assets/video/*'])
		.pipe(dest(buildPath + 'assets/video/'))
}

var build = series(clean, parallel(jsVendor, jsMain, images, sassCompile, copyIndex, copyRoot, copyFavicon, copyJs, copyFont, copyVideo));
exports.build = build;
exports.default = build;