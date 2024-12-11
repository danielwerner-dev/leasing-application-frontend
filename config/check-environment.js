/* eslint-disable no-console */
import { variables } from "./variables.js";

function checkEnvironment() {
  /** @type {Array.<string>} */
  const missingVariables = [];
  Object.entries(variables).forEach(([key, value]) => {
    if (typeof value === "undefined") {
      console.warn(`Missing variable ${key}`);
      missingVariables.push(key);
    }
  });

  if (missingVariables.length) {
    console.error(
      "Missing configuration variables. Will not start application.",
      { missingVariables }
    );
    throw new Error("Missing configuration variables");
  }
}

if (process.env.SKIP_ENV_CHECK !== "true") {
  checkEnvironment();
}
