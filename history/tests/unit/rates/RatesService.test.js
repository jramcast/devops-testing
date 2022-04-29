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

    test("returns exchange rates", () => {
        // Given
        const repository = {
            load: () => [{ value: 0.5}]
        };
        const service = new RatesService(repository);

        // When
        const rates = service.loadRatesHistory("EUR", "USD");

        // Then
        expect(rates[0].value).toBe(0.5);
    });


    test("returns exchange rates including dates", () => {
        // Given
        const repository = {
            load: () => [{ value: 0.5}, { value: 0.3 }]
        };
        const service = new RatesService(repository);

        // When
        const rates = service.loadRatesHistory("EUR", "USD");

        // Then
        for(const rate of rates) {
            expect(rate.date).toBeInstanceOf(Date);
        }
    });

});