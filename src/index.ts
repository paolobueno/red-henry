import * as express from "express";
import { createServer } from "http";
import { tmpdir } from "os";
import { join } from "path";

// tslint:disable-next-line:no-var-requires
const RED: any = require("node-red");

const app = express();
app.use("/", express.static(join(__dirname, "public")));

const redSettings = {
  functionGlobalContext: { },
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  nodesDir: join(__dirname, "../nodes"),
  userDir: join(__dirname, "../red/"),
};
const server = createServer(app);
RED.init(server, redSettings);

// Serve the editor UI from /red
app.use(redSettings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(redSettings.httpNodeRoot, RED.httpNode);

server.listen(process.env.PORT || 8080);
RED.start();
