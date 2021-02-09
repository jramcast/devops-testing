package com.redhat.restclient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.restclient.services.HistoryService;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/exchangeRate")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExchangeResource {

    @Inject
    @RestClient
    HistoryService historyService;

    @Inject
    CurrencyProcessor currencyProcessor;

    ObjectMapper mapper = new ObjectMapper();

    @POST
    @Path("/historicalData")
    public List<Currency> getHistoricalData(String body) {
        return historyService.getCurrencyExchangeRates(body);
    }

    @POST
    @Path("/singleCurrency")
    public Currency getExchangeRate(String body) {
        List<Currency> currencies = historyService.getCurrencyExchangeRates(body);
        String target = "";
        try {
            target = mapper.readTree(body).get("target").asText();
        } catch (Exception e) {
            e.printStackTrace();
            target = "EUR";
        }
        return currencyProcessor.getFirst(currencies, target);
    }

}
