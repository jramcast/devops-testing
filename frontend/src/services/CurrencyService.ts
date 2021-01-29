import { getRESTClient, ServiceName } from "../API";
import Currency from "../models/Currency";

const API = getRESTClient(ServiceName.GW_SERVICE);

export async function getCurrencies() {
    return API.url("/currencies").get().json<string[]>();
}

export async function convertSingleCurrency(payload: {
    source: string;
    target: string;
}) {
    return API.url("/exchangeRate/singleCurrency")
        .headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })
        .post(payload)
        .json<Currency>();
}

export async function getHistoricalData(payload: {
    source: string;
    target: string;
}) {
    return API.url("/exchangeRate/historicalData")
        .headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })
        .post(payload)
        .json<Currency[]>();
}
