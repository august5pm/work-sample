// Include gulp
const { src, dest, series, parallel } = require('gulp');

const gulp = require('gulp');

const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpSass = require('gulp-sass');
const sass = gulpSass(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
// const uglify = require('gulp-uglify');
const htmlReplace = require('gulp-html-replace');
const replace = require('gulp-replace');
const obfuscator = require('gulp-javascript-obfuscator');
const del = require('del');

// 소스 루트 경로
const root = './src';
const build = './dist';

const time = new Date().getTime();

// 소스 세부 경로
const rootPath = {
	index: [`${root}/*.html`, '!' + `${root}/_include/*.html`],
	html_ko: [`${root}/ko/**/*.html`],
	html_en: [`${root}/en/**/*.html`],
	css: [`${root}/assets/scss/*.scss`, `${root}/assets/css/*.css`],
	js: [`${root}/assets/js/**/*.js`],
	json: [`${root}/data/json/**/*.json`],
	images: `${root}/assets/images/**/*.{gif,png,jpeg,jpg,svg,ico}`,
	fonts: `${root}/assets/fonts/**/*`,
	favicon: `${root}/favicon/*`
};
const buildPath = {
	index: `${build}/`,
	html_ko: `${build}/ko/`,
	html_en: `${build}/en/`,
	css: `${build}/assets/css`,
	js: `${build}/assets/js`,
	json: `${build}/data/json/`,
	images: `${build}/assets/images/`,
	fonts: `${build}/assets/fonts/`,
	favicon: `${build}/favicon/`
};

// HTML Compile
gulp.task('indexCompile', function (done) {
	gulp
		.src(rootPath.index, { since: gulp.lastRun('indexCompile') })
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.index, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});
gulp.task('htmlCompile', function (done) {
	gulp
		.src(rootPath.html_ko, { since: gulp.lastRun('htmlCompile') })
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.html_ko, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});
gulp.task('htmlCompileEn', function (done) {
	gulp
		.src(rootPath.html_en, { since: gulp.lastRun('htmlCompileEn') })
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.html_en, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

// CSS Compile
gulp.task('cssCompile', function (done) {
	gulp
		.src(rootPath.css, { since: gulp.lastRun('cssCompile') })
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed',
				sourceComments: true
			}).on('error', sass.logError)
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildPath.css, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

// JavaScript Compile
gulp.task('jsCompile', function (done) {
	gulp
		.src(rootPath.js, { since: gulp.lastRun('jsCompile') })
		.pipe(gulp.dest(buildPath.js, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

// JSON Compile
gulp.task('jsonCompile', function (done) {
	gulp
		.src(rootPath.json, { since: gulp.lastRun('jsonCompile') })
		.pipe(gulp.dest(buildPath.json, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

// 이미지 Compile
gulp.task('imgMinCompile', function (done) {
	gulp.src(rootPath.images).pipe(gulp.dest(buildPath.images));
	done();
});

// 폰트 Compile
gulp.task('fontCompile', function (done) {
	gulp.src(rootPath.fonts).pipe(gulp.dest(buildPath.fonts));
	done();
});

// 파비콘
gulp.task('faviconCompile', function (done) {
	gulp.src(rootPath.favicon).pipe(dest(buildPath.favicon));
	done();
});

gulp.task('server', function (done) {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: './dist/'
		},
		browser: ['chrome' /*"chrome", "firefox"*/]
	});
	done();
});

// 파일 변경 감지
gulp.task('watch', function (done) {
	//src 디렉토리 안에 html 확장자를 가진 파일이 변경되면 htmlCompile task 실행
	gulp.watch(rootPath.index, gulp.series('indexCompile'));
	gulp.watch(rootPath.html_ko, gulp.series('htmlCompile'));
	gulp.watch(rootPath.html_en, gulp.series('htmlCompileEn'));
	//src 디렉토리 안에 css 확장자를 가진 파일이 변경되면 cssCompile task 실행
	gulp.watch(rootPath.css, gulp.series('cssCompile'));
	// gulp.watch((rootPath.css).on('change', browserSync.reload));
	//src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 jsCompile task 실행
	gulp.watch(rootPath.js, gulp.series('jsCompile'));
	gulp.watch(rootPath.json, gulp.series('jsonCompile'));
	//src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 imgMinCompile task 실행
	gulp.watch(rootPath.images, gulp.series('imgMinCompile'));
	done();
});

// copyIndex
gulp.task('copyIndexDev', function (done) {
	gulp
		.src(rootPath.index)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.index, { allowEmpty: true }))
		.pipe(browserSync.reload({ stream: true }));
	done();
});

gulp.task('copyHtmlDev', function (done) {
	gulp
		.src(rootPath.html_ko)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.html_ko, { allowEmpty: true }));
	done();
});

gulp.task('copyHtmlEnDev', function (done) {
	gulp
		.src(rootPath.html_en)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest(buildPath.html_en, { allowEmpty: true }));
	done();
});

/**
 * build product
 */

gulp.task('clean', function () {
	return del(build);
});

// vendor.min.js
gulp.task('jsVendor', function (done) {
	gulp
		.src([
			`${root}/assets/js/vendor/jquery-3.5.0.min.js`,
			`${root}/assets/js/vendor/jquery-ui-1.12.1.js`,
			`${root}/assets/js/vendor/gsap.min.js`,
			`${root}/assets/js/vendor/ScrollToPlugin.min.js`,
			`${root}/assets/js/vendor/swiper.min.js`,
			`${root}/assets/js/vendor/AUGUST5PM.libs.js`
		])
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(dest(`${build}/assets/js`));
	done();
});

// contents.min.js
gulp.task('jsContents', function (done) {
	gulp
		.src([
			`${root}/assets/js/contents/common/resize.js`,
			`${root}/assets/js/contents/common/gnb.js`,
		])
		.pipe(concat('contents.min.js'))
		.pipe(uglify())
		.pipe(obfuscator())
		.pipe(dest(`${build}/assets/js`));
	done();
});


// CSS Compile
gulp.task('cssProdComplie', function (done) {
	gulp
		.src(`${root}/assets/scss/**/*.scss`)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed',
				sourceComments: true
			}).on('error', sass.logError)
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(`${build}/assets/css`));
	done();
});

// copyDetectizr
gulp.task('copyDetectizr', function (done) {
	gulp.src([`${root}/assets/js/vendor/detectizr.min.js`]).pipe(dest(`${build}/assets/js/vendor`));
	done();
});

// copyJs
gulp.task('copyJs', function (done) {
	gulp
		.src([
			`${root}/assets/js/contents/history.js`,
			`${root}/assets/js/contents/main.js`,
			`${root}/assets/js/contents/post_highlight.js`,
			`${root}/assets/js/contents/post_news.js`,
			`${root}/assets/js/contents/post_notice.js`,
			`${root}/assets/js/contents/voting_main.js`,
		])
		.pipe(uglify())
		.pipe(obfuscator())
		.pipe(dest(`${build}/assets/js/contents`));
	done();
});


// copyJson
gulp.task('copyJson', function (done) {
	gulp.src([`${root}/data/json/**/*.json`]).pipe(dest(`${build}/data/json`));
	done();
});

// copyRoot
gulp.task('copyRoot', function (done) {
	gulp
		.src([`${root}/robots.txt`, `${root}/sitemap.xml`, `${root}/favicon.ico`])
		.pipe(dest(`${build}/`));
	done();
});

// copyFavicon
gulp.task('copyFavicon', function (done) {
	gulp.src([`${root}/favicon/*`]).pipe(dest(`${build}/favicon`));
	done();
});

// copyIndex
gulp.task('copyIndex', function (done) {
	gulp
		.src(rootPath.index)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(replace('.js?v=', '.js?v=' + time))
		.pipe(
			htmlReplace({
				js: [
					`/assets/js/vendor.min.js?v=${time}`,
					`/assets/js/contents.min.js?v=${time}`
				]
			})
		)
		.pipe(replace('.css', '.css?v=' + time))
		.pipe(gulp.dest(buildPath.index, { allowEmpty: true }));
	done();
});

gulp.task('copyHtml', function (done) {
	gulp
		.src(rootPath.html_ko)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(replace('.js?v=', '.js?v=' + time))
		.pipe(
			htmlReplace({
				js: [
					`/assets/js/vendor.min.js?v=${time}`,
					`/assets/js/contents.min.js?v=${time}`
				]
			})
		)
		.pipe(replace('.css', '.css?v=' + time))
		.pipe(gulp.dest(buildPath.html_ko, { allowEmpty: true }));
	done();
});

gulp.task('copyHtmlEn', function (done) {
	gulp
		.src(rootPath.html_en)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(replace('.js?v=', '.js?v=' + time))
		.pipe(
			htmlReplace({
				js: [
					`/assets/js/vendor.min.js?v=${time}`,
					`/assets/js/contents.min.js?v=${time}`
				]
			})
		)
		.pipe(replace('.css', '.css?v=' + time))
		.pipe(gulp.dest(buildPath.html_en, { allowEmpty: true }));
	done();
});

/**
 * GULP TASK DEV : > gulp
 */
gulp.task(
	'default',
	gulp.series(
		'jsCompile',
		'jsonCompile',
		'cssCompile',
		'copyIndexDev',
		'copyHtmlDev',
		'copyHtmlEnDev',
		'indexCompile',
		'htmlCompile',
		'htmlCompileEn',
		'imgMinCompile',
		'fontCompile',
		'faviconCompile',
		gulp.parallel('watch', 'server')
	)
);

/**
 * GULP TASK PRODUCT : > gulp prod
 */
gulp.task(
	'prod',
	gulp.series(
		'clean',
		gulp.parallel(
			'jsVendor',
			'jsContents',
			'copyDetectizr',
			'copyJs',
			'copyJson',
			'copyRoot',
			'copyFavicon',
			'copyIndex',
			'copyHtml',
			'copyHtmlEn',
			'imgMinCompile',
			'cssProdComplie',
			'fontCompile'
		)
	)
);
