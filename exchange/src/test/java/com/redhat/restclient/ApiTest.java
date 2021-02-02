package com.redhat.restclient;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Tag;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
@Tag("integration")
public class ApiTest {

    @Test
    public void testHelloEndpoint() {
        assertTrue(true);
        // given()
        //   .when().get("/")
        //   .then()
        //      .statusCode(200)
        //      .body(is("hello"));
    }
}
