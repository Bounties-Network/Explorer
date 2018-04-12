import rollbar from 'rollbar/dist/rollbar.umd.min.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_KEY_CLIENT,
  captureUncaught: true,
  captureUnhandledRejections: true,
  autoInstrument: true,
  payload: {
    environment: process.env.NODE_ENV,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.DIST_VERSION,
        // Optionally have Rollbar guess which frames the error was thrown from
        // when the browser does not provide line and column numbers.
        guess_uncaught_frames: true
      }
    }
  }
};

const rollbarClient = rollbar.init(rollbarConfig);

if (process.env.NODE_ENV === 'development') {
  rollbarClient.configure({ enabled: false });
}

export default rollbarClient;
