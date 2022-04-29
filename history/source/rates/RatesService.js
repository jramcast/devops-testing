/**
 * This service returns historical exchange rates
 */
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

        return data.map(rate => ({ date: new Date() , ...rate }));
    }

};