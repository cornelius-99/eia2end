import * as Http from "http";
import * as Url from "url";
import * as mongo from "mongodb";
import FireworkConfig = Firework.FireworkConfig;


const uri: string = <string>process.env.CONNECTION_STRING;
const client: mongo.MongoClient = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let fireworks: mongo.Collection;
client.connect(_err => {
  fireworks = client.db("Firework").collection("fireworks");
});


let server: Http.Server = Http.createServer();

let port: number | string | undefined = process.env.PORT;
if (port == undefined)
  port = 5001;

console.log("Server starting on port:" + port);

server.listen(port);
server.addListener("request", handleRequest);

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> {

  _response.setHeader("content-type", "text/json; charset=utf-8");
  _response.setHeader("Access-Control-Allow-Origin", "*");

  if (_request.url) {
    let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

    if (url.query["type"] == "put") {

      let recipe: FireworkConfig = JSON.parse(<string>url.query["fireworkconfig"]);
      fireworks.insertOne(recipe);

      let jsonString: string = JSON.stringify(recipe);
      _response.write(jsonString);
    } else if (url.query["type"] == "get") {
      let allFireworks: FireworkConfig[] = await fireworks.find().toArray();
      _response.write(JSON.stringify(allFireworks));
    }
  }
  _response.end();
}
