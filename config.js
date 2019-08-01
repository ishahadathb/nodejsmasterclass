const environments = {
  production: { port: 3000, envName: "production" },
  staging: { port: 4000, envName: "staging" }
};

const { NODE_ENV } = process.env;
const currentEnvironment =
  NODE_ENV && typeof NODE_ENV === "string" ? NODE_ENV : "";
currentEnvironment.toLowerCase();
const enviromentToExport = environments[currentEnvironment]
  ? environments[currentEnvironment]
  : environments.staging;

module.exports = enviromentToExport;
