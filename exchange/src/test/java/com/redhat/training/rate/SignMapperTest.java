package com.redhat.training.rate;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class SignMapperTest {

    @Test
    void returnsTheCorrectSign() throws Exception {

        SignMapper mapper = new SignMapper();

        String simbol = mapper.getSign("USD");

        assertEquals("$", simbol);
    }

}
