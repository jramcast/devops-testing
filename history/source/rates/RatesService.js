module.exports = class RatesService {

    constructor(repository) {
        this.repository = repository;
    }

    loadRatesHistory(src, target) {
        const data =  this.repository.load(src + "_TO_" + target);

        // Each data point in "data" follows this format:
        //  { "value": exchangeRateValue }

        if (data === null) {
            throw new Error("Unknown currency conversion");
        }

        // TODO: return data points
        //
        // Each returned data point should include a date, following this syntax:
        //  {"value": exchangeRateValue, "date": instanceOfDate }
    }

};