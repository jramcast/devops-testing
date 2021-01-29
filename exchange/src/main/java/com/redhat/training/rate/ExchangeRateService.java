package com.redhat.training.rate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.training.currency.Currency;

import java.util.List;
import javax.inject.Inject;

import org.eclipse.microprofile.rest.client.inject.RestClient;

public class ExchangeRateService {

    @Inject
    @RestClient
    HistoryRestClient historyService;


    ObjectMapper mapper = new ObjectMapper();


    public Currency getLatestRate(String body) {

        List<Currency> currencies = historyService.getCurrencyExchangeRates(body);
        Currency latestCurrency = currencies.get(0);

        try {
            String target = mapper.readTree(body).get("target").asText();
            if(target.equals("USD")) {
                latestCurrency.setSign("$");
            } else {
                latestCurrency.setSign("€");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return latestCurrency;
    }
}
