import configDev from './config.dev';
import configProd from './config.prod';
import configLocal from './config.localhost';
import extend from 'lodash/extend';

const env = process.env.NODE_ENV;

const config = extend(
  configLocal,
  (env === "prod" && configProd) || (env === "dev" && configDev) || {}
)
export default config;
