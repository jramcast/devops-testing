import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Welcome } from "./Welcome";

describe("Welcome", () => {
    let welcome: RenderResult;

    beforeEach(() => {
        welcome = render(<Welcome />);
    });

    test("renders welcome page", async () => {
        expect(
            welcome.getByText("Welcome to the currency exchange application!"),
        ).toBeTruthy();
    });
});
