package com.redhat.training.rate;

public class SignMapper {

    public String getSign( String currency ) {
        if(currency.equals("USD")) {
            return "$";
        }
        return "€";
    }
}
