import * as express from "express";
import { readdirSync } from "fs";
import { createServer } from "http";
import { tmpdir } from "os";
import { join } from "path";

// tslint:disable-next-line:no-var-requires
const RED: any = require("node-red");

const app = express();
app.use("/", express.static(join(__dirname, "public")));

const redSettings = {
  functionGlobalContext: { },
  flowFile: "flows.json",
  flowFilePretty: true,
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  logging: {
    console: {
      level: "trace"
    }
  },
  userDir: join(__dirname, "../nodes/"),
};
const server = createServer(app);
RED.init(server, redSettings);

// DEBUG list stuff in directories
console.log('listing contents of userDir');
console.log(readdirSync(join(redSettings.userDir, "node_modules")));

// Serve the editor UI from /red
app.use(redSettings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(redSettings.httpNodeRoot, RED.httpNode);

export default (port: number) => {
  RED.start();
  server.listen(port);
};
