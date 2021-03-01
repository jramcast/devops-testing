const RatesService = require("../../../source/rates/RatesService");

describe("RatesService", () => {

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

    test("returns a list of currency exchange rates read from the repository", () => {
        // Given
        const repository = {
            load: () => [{ value: 1 }, { value: 5}]
        };
        const service =  new RatesService(repository);

        // When
        const rates = service.loadRatesHistory("EUR", "USD");

        // Then
        expect(rates[0].value).toBe(1);
        expect(rates[1].value).toBe(5);
    });


    test("returns each data point with a date", () => {
        // Given
        const repository = {
            load: () => [{ value: 1 }, { value: 5}]
        };
        const service =  new RatesService(repository);

        // When
        const rates = service.loadRatesHistory("EUR", "USD");

        // Then
        for (const rate of rates) {
            expect(rate.date).toBeInstanceOf(Date);
        }
    });

});