package com.redhat.restclient;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Tag;


@Tag("unit")
public class CurrencyProcessorTest {

    @Test
    void getFirst_returnsFirstValueFromList() throws Exception {
        // Given
        Currency firstValue = new Currency();
        firstValue.setValue("1.5");
        Currency secondValue = new Currency();
        secondValue.setValue("1.9");

        List<Currency> history = new ArrayList<>();
        history.add(firstValue);
        history.add(secondValue);

        // When
        CurrencyProcessor processor = new CurrencyProcessor();
        var result = processor.getFirst(history, "USD");

        // Then
        assertEquals(firstValue, result);
    }

    @Test
    void getFirst_setsCurrencySymbol() throws Exception {
        Currency curr1 = new Currency();
        curr1.setValue("1.5");
        List<Currency> currencies = new ArrayList<>();
        currencies.add(curr1);


        CurrencyProcessor processor = new CurrencyProcessor();
        var result = processor.getFirst(currencies, "EUR");

        assertEquals("€", result.getSymbol());
    }

}
