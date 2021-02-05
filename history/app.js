const Server = require("./source/Server");
const RatesService = require("./source/rates/RatesService");
const repository = require("./source/rates/RatesRepository");

Server.start(new RatesService(repository));