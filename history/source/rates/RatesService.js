module.exports = class RatesService {

    constructor(repository) {
        this.repository = repository;
    }

    loadRatesHistory(src, target) {
        const data =  this.repository.load(src + "_TO_" + target);

        if (data === null) {
            throw new Error("Unknown currency conversion");
        }

        return data.map((element, i) => {
            const elementWithDate = {...element};
            var date = new Date();
            date.setDate(date.getDate() - i);
            elementWithDate["date"] = date;
            return elementWithDate;
        });
    }

};