package com.redhat.restclient;

public class SignMapper {

    public String getSign( String currency ) {
        if(currency.equals("USD")) {
            return "$";
        }
        return "€";
    }
}
