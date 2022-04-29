/**
 * This class returns exchange rates historical data
 */
module.exports = class RatesService {

    constructor(repository) {
        this.repository = repository;
    }

    loadRatesHistory(src, target) {
        const rates =  this.repository.load(src + "_TO_" + target);

        // Each data point in "data" follows this format:
        //  { "value": exchangeRateValue }

        if (rates === null) {
            throw new Error("Unknown currency conversion");
        }

        // TODO: return data points
        //
        // Each returned data point should include a date, following this syntax:
        //  {"value": exchangeRateValue, "date": instanceOfDate }
        return rates.map(rate => ({
            date: new Date(),
            ...rate
        }));
    }

};