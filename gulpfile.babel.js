import browserSync from 'browser-sync';
import { argv } from 'yargs';
import { dest, series, src, watch } from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

/**
 * Environment check
 */
const { production } = argv;

/**
 * Main Dirs
 */
const DIR_APP_ROOT = '.';
const DIR_DIST = `${DIR_APP_ROOT}/dist`;
//const DIR_JS = `${DIR_APP_ROOT}/js`;
const DIR_PLAYGROUND = `${DIR_APP_ROOT}/playground`;
const DIR_SCSS = `${DIR_APP_ROOT}/scss`;

/**
 * Paths
 */
const PATHS = {
  browserSync: {
    src: DIR_PLAYGROUND,
  },
  playground:{
    src: `${DIR_PLAYGROUND}/**/*.html`
  },
  scss: {
    src: `${DIR_SCSS}/**/*.{sass,scss}`,
    dest: {
      dev: `${DIR_PLAYGROUND}/css`,
      production: `${DIR_DIST}`,
    },
  },
};

/**
 * Settings
 */
const SETTINGS = {
  browserSync: {
    server: {
      baseDir: PATHS.browserSync.src,
    },
    open: false,
  },
  scss: {
    includePaths: ['node_modules/foundation-sites/scss']
  }
};

/**
 * Helper Functions
 */
const ifProdElseDev = (prod, notProd) => production ? prod : notProd;

/**
 * Gulp Task Functions
 */

export const buildScss = (cb) => src(PATHS.scss.src)
  .pipe(sourcemaps.init())
  .pipe(sass(SETTINGS.scss).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(dest(ifProdElseDev(PATHS.scss.dest.production, PATHS.scss.dest.dev)))
  .pipe(browserSync.stream());

export const build = series(buildScss);

export const startServer = (cb) => {
  browserSync.init(SETTINGS.browserSync);

  watch(PATHS.scss.src, buildScss);
  watch(PATHS.playground.src).on('change', browserSync.reload);
}

export const devPlayground = series(
  build,
  startServer,
)

export default devPlayground;
