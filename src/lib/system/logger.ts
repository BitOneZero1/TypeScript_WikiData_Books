import dbg from 'debug';

// import { LOG_LEVEL } from '$lib/env';
const LOG_LEVEL : String = "debug";

const debug = dbg('PlotD:debug');
const info = dbg('PlotD:info');
const warn = dbg('PlotD:warn');
const error = dbg('PlotD:error');

(() => {
  const str = [];
  switch (LOG_LEVEL) {
    case 'debug':
      str.push('PlotD:debug');
    // falls through
    case 'info':
      str.push('PlotD:info');
    // falls through
    case 'warn':
      str.push('PlotD:warn');
    // falls through
    case 'error':
      str.push('PlotD:error');
  }
  dbg.enable(str.join(','));
})();

export const logger = { debug, info, warn, error };
