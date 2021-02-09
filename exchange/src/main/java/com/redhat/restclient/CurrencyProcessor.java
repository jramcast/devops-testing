package com.redhat.restclient;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CurrencyProcessor {

    public Currency getFirst(List<Currency> currencies, String target) {
        Currency latestCurrency = currencies.get(0);
        try {
            if(target.equals("USD")) {
                latestCurrency.setSymbol("$");
            } else {
                latestCurrency.setSymbol("€");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return latestCurrency;
    }

}
