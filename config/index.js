import commonConfig from './common';
import devConfig from './dev.js';
const mode = 'DEV';
// const mode = 'DEV';

let config = {};

if (mode === 'DEV') {
    config = devConfig;
}

export default {
    ...commonConfig,
    ...config
};
