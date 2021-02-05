const axios = require("axios");

describe("Service Integration test", () => {


    test("POST / returns 200", async () => {
        const response = await axios.post("http://localhost:8762", {
            source: "EUR", target: "USD"
        });

        expect(response.status).toBe(200);
    });

});