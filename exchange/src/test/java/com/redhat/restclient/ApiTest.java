package com.redhat.restclient;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Tag;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasKey;

import java.util.HashMap;
import java.util.Map;

@QuarkusTest
@Tag("integration")
public class ApiTest {

    @Test
    public void testCurrenciesEndpoint() {
        given()
        .when()
            .get("/currencies")
        .then()
             .statusCode(200)
             .body("size()", is(greaterThan(1)));
    }

    @Test
    public void testSingleRateEndpoint() {
        Map<String, Object> params = new HashMap<>();
        params.put("source", "EUR");
        params.put("target", "USD");

        given()
            .body(params)
            .accept(ContentType.JSON)
            .contentType(ContentType.JSON)
        .when()
            .post("/exchangeRate/singleCurrency")
        .then()
            .statusCode(200)
            .body("$", hasKey("value"))
            .body("$", hasKey("date"));
    }
}
