import commonConfig from './common';
import devConfig from "./dev.js";
const mode='PRO';
// const mode = 'DEV';

let config={};

if (mode ==='PRO'){
  config=devConfig;
}

export default {
  ...commonConfig,
  ...config
};
