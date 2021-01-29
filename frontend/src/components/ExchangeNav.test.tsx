import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, RenderResult } from "@testing-library/react";
import { ExchangeNav } from "./ExchangeNav";

describe("ExchangeNav", () => {
    let navigation: RenderResult;

    beforeEach(() => {
        navigation = render(<ExchangeNav />, { wrapper: MemoryRouter });
    });

    test("renders link to /", async () => {
        expect(navigation.getByText("Home").href).toMatch(/\/$/);
    });

    test("renders link to /history", async () => {
        expect(navigation.getByText("Historical Data").href).toMatch(
            /\/history$/,
        );
    });

    test("renders link to /exchange", async () => {
        expect(navigation.getByText("Exchange").href).toMatch(/\/exchange$/);
    });

    test("conditionally renders /news", async () => {
        expect(navigation.queryByText("News")).toBeNull();
        process.env.REACT_APP_NEWS_ENABLED = "true";
        navigation = render(<ExchangeNav />, { wrapper: MemoryRouter });
        expect(navigation.queryByText("News").href).toMatch(/\/news$/);
    });
});
