package com.redhat.training.rate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.training.currency.Currency;
import com.redhat.training.news.News;
import com.redhat.training.news.NewsRestClient;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/rate")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExchangeResource {

    @Inject
    @RestClient
    HistoryRestClient historyService;

    @Inject
    @RestClient
    NewsRestClient newsService;

    @Inject
    ExchangeRateService rateService;

    ObjectMapper mapper = new ObjectMapper();

    @GET
    @Path("/news")
    public List<News> getFinancialNews() {
        return newsService.getFinancialNews();
    }

    @POST
    @Path("/history")
    // TODO: validate whether currency Service serves the source/target currency
    // something like new ObjectMapper().readTree(body).get("source")
    public List<Currency> getHistoricalData(String body) {
        return historyService.getCurrencyExchangeRates(body);
    }

    @POST
    @Path("/singleCurrency")
    // TODO: validate whether currency Service serves the source/target currency
    public Currency getExchangeRate(String body) {
        return rateService.getLatestRate(body);
    }

    // A simple health check of the service, as well as
    // connectivity check between the service and other services
    @GET
    public String ping() {
        return "pong";
    }
}
