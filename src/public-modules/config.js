import { flatten, groupBy, keys, values } from "lodash";
import ipfs from "./ipfs";

const config = require("./config.json");
const moduleSettings = require(`./${process.env.APP_SETTINGS_FILE}.json`);

const platforms = moduleSettings.platforms
  ? moduleSettings.platforms
  : groupBy(value => value, moduleSettings.platform.split(","));

export default {
  ...config,
  ...moduleSettings,
  platforms,
  platform: flatten(values(platforms)).join(","),
  displayPlatforms: keys(platforms),
  ipfs
};
