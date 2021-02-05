const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");

function start(ratesService, port=PORT) {
    const server = express();
    server.use(bodyParser.json());
    server.use(cors);
    server.get("/", (req, res) => {
        res.send("OK");
    });
    server.post("/", postData);

    const onStarted = new Promise((resolve) => {
        server.listen(port, () => {
            console.log(`App is running at http://localhost:${port}`);
            resolve(server);
        });
    });

    function postData(req, res) {
        console.log(`Serving request: ${JSON.stringify(req.body)}`);

        const srcCurrency = req.body.source;
        const targetCurrency = req.body.target;

        const data = ratesService.loadRatesHistory(srcCurrency, targetCurrency);

        res.setHeader("Content-Type", "application/json");
        res.json(data).status(200);
    }

    return onStarted;

}

function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}



module.exports = {
    start
};
