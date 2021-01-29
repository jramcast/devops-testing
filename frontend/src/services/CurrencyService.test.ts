import Currency from "../models/Currency";
import * as service from "./CurrencyService";

const dummyCurrency: Currency = {
    date: "2020-01-01",
    value: "value",
    name: "name",
    sign: "$",
};

describe("CurrencyService", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe("#getCurrencies", () => {
        test("sends a GET response", async () => {
            const dummyStringList = ["first", "second", "third"];
            fetchMock.mockResponseOnce(JSON.stringify(dummyStringList));
            const response = await service.getCurrencies();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(response).toEqual(dummyStringList);
        });
    });

    describe("#convertSingleCurrency", () => {
        test("sends a POST response", async () => {
            fetchMock.mockResponseOnce(JSON.stringify(dummyCurrency));
            const response = await service.convertSingleCurrency({
                source: "source",
                target: "target",
            });
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(response).toEqual(dummyCurrency);
        });
    });

    describe("#getHistoricalData", () => {
        test("sends a GET response", async () => {
            fetchMock.mockResponseOnce(JSON.stringify([dummyCurrency]));
            const response = await service.getHistoricalData({
                source: "source",
                target: "target",
            });
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(response).toEqual([dummyCurrency]);
        });
    });
});
