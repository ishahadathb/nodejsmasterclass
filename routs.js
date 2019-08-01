const handlers = require("./handlers");
module.exports = {
  sample: handlers.sample,
  notFound(data, callback) {
    callback(400, "Bad Request");
  }
};
