const config = require('./config.json');
const moduleSettings = require(`./${process.env.APP_SETTINGS_FILE}.json`);

export default {
  ...config,
  ...moduleSettings
};
