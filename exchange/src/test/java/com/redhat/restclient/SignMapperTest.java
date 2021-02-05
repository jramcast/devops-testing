package com.redhat.restclient;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Tag;

@Tag("unit")
public class SignMapperTest {

    @Test
    void mapsUSD() throws Exception {
        SignMapper mapper = new SignMapper();

        String simbol = mapper.getSign("USD");

        assertEquals("$", simbol);
    }

    @Test
    void mapsEUR() throws Exception {
        SignMapper mapper = new SignMapper();

        String simbol = mapper.getSign("EUR");

        assertEquals("€", simbol);
    }

}
