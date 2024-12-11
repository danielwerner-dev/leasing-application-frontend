/* eslint-disable no-console */
import polka from "polka";

import { handler } from "./build/handler.js";

const path = process.env["SOCKET_PATH"] || false;
const host = process.env["HOST"] || "0.0.0.0";
const port = process.env["PORT"] || 3000;

function parseURI(req, res) {
  try {
    decodeURI(req.url);
  } catch (err) {
    const encodedUriPath = encodeURI(req.url);
    console.error(
      `[server] URIError: can't decode ${req.url}. Redirecting to ${encodedUriPath}`
    );
    req.url = encodedUriPath;
  } finally {
    handler(req, res);
  }
}

polka()
  .use(parseURI)
  .listen({ port, host, path }, (err) => {
    if (err) throw err;

    console.log("Using the server wrapper");
    console.log(`Listening on ${path ? path : host + ":" + port}`);
  });
