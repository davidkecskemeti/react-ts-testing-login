import { ServerResponse, IncomingMessage } from "http";
import { HTTP_CODES } from "./ServerModels";
import { Utils } from "./Utils";

export class LoginHandler {
  private request: IncomingMessage;
  private response: ServerResponse;

  public constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = request;
    this.response = response;
  }

  public async handleRequest() {
    try {
      const requestBody = await Utils.getRequestBody(this.request);
      if (requestBody.username == "user") {
        this.response.statusCode = HTTP_CODES.CREATED;
        this.response.writeHead(HTTP_CODES.CREATED, {
          "Content-Type": "application/json",
        });
      } else {
        this.response.statusCode = HTTP_CODES.NOT_fOUND;
        this.response.write("wrong username or password");
      }
    } catch (error) {
      this.response.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
      this.response.write("Internal error: " + error.message);
    }
  }
}
