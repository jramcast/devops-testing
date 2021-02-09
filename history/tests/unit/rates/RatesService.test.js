const RatesService = require("../../../source/rates/RatesService");

describe("RatesService", () => {

    test("returns rates retrieved from a rates repository", () => {
        const repository = {
            load: () => [{ value: 1 }, { value: 2 }, { value: 3 } ]
        };

        const service = new RatesService(repository);
        const rates = service.loadRatesHistory("EUR", "USD");
        expect(rates).toEqual([{ value: 1 }, { value: 2 }, { value: 3 } ]);
    });

    test("throws an exception if the repository returns null", () => {
        function invalidScenario() {
            const repository = {
                load: () => null
            };
            const service = new RatesService(repository);
            service.loadRatesHistory("EUR", "USD");
        }

        expect(invalidScenario).toThrow(/Unknown currency conversion/i);
    });

});