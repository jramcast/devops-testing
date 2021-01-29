import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("Welcome", () => {
    let spinner: RenderResult;

    beforeEach(() => {
        spinner = render(<LoadingSpinner />);
    });

    test("renders loading spinner", async () => {
        expect(spinner.getByText("Loading")).toBeTruthy();
    });
});
