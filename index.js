const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const routes = require("./routs");
const environments = require("./config");

const server = http.createServer(function(req, res) {
  // 1. get the url
  const parsedUrl = url.parse(req.url, true);

  // 2. get the path
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");

  // get the method
  const method = req.method.toLocaleLowerCase();

  // get the query strnig
  const query = parsedUrl.query;

  // get the header
  const headers = req.headers;

  // decode payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", data => {
    buffer += data;
  });

  req.on("end", () => {
    buffer += decoder.end();
    // load appropriate handlers depending the path
    console.log(routes.notFound);
    const choosenHandler = trimmedPath ? routes[trimmedPath] : routes.notFound;

    const data = {
      trimmedPath,
      headers,
      query,
      method,
      payload: buffer
    };

    choosenHandler(data, (status, payload) => {
      const payloadString = payload && JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(status);
      res.end(payloadString);
    });
  });

  // 4. Log the request
});

server.listen(environments.port, function() {
  console.log(`server is listening to port: ${environments.port}!`);
});
