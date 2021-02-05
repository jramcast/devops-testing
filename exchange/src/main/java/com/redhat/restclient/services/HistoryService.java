package com.redhat.restclient.services;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.redhat.restclient.Currency;

import java.util.List;

/**
 * Microservice that provides historical exchange rates
 */
@Path("/")
@RegisterRestClient
public interface HistoryService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    List<Currency> getCurrencyExchangeRates(String body);
}
