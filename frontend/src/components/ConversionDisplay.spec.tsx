import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ConversionDisplay } from "./ConversionDisplay";

describe("ConversionDisplay", () => {
    // GIVEN an input value of $3
    // AND a conversion rate of 2
    // WHEN ConversionDisplay is rendered
    // THEN
    it("should calculate $3 * 2 = $6", async () => {
        const conversionDisplay: RenderResult = render(
            <ConversionDisplay
                currency={{ date: "unused", value: "2", sign: "$" }}
                value={3}
            />,
        );
        expect(conversionDisplay.getByText("$6")).toBeTruthy();
    });

    // GIVEN an input value of $4.50
    // AND a conversion rate of 0.67
    // WHEN ConversionDisplay is rendered
    // THEN
    it("should calculate $4.50 * 0.67 = $3.015", async () => {
        const conversionDisplay: RenderResult = render(
            <ConversionDisplay
                currency={{ date: "unused", value: "0.67", sign: "$" }}
                value={4.5}
            />,
        );
        expect(conversionDisplay.getByText("$3.015")).toBeTruthy();
    });
});
