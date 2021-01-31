"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const mongo = require("mongodb");
const uri = process.env.CONNECTION_STRING;
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let fireworks;
client.connect(_err => {
    fireworks = client.db("Firework").collection("fireworks");
});
let server = Http.createServer();
let port = process.env.PORT;
if (port == undefined)
    port = 5001;
console.log("Server starting on port:" + port);
server.listen(port);
server.addListener("request", handleRequest);
async function handleRequest(_request, _response) {
    _response.setHeader("content-type", "text/json; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        if (url.query["type"] == "put") {
            let recipe = JSON.parse(url.query["fireworkconfig"]);
            fireworks.insertOne(recipe);
            let jsonString = JSON.stringify(recipe);
            _response.write(jsonString);
        }
        else if (url.query["type"] == "get") {
            let allFireworks = await fireworks.find().toArray();
            _response.write(JSON.stringify(allFireworks));
        }
    }
    _response.end();
}
//# sourceMappingURL=server.js.map