import { createServer, ServerResponse } from "http";
import { Utils } from "./Utils";
import { LoginHandler } from "./LoginHandler";

export class Server {
  public startServer() {
    createServer(async (req, res) => {
      const basePath = Utils.getRequestBasePath(req);
      this.addCorsHeader(res);
      if (basePath === "login")
        await new LoginHandler(req, res).handleRequest();
      res.end();
    }).listen(8080);
    console.log("server started");
  }

  private addCorsHeader(res: ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
  }
}
