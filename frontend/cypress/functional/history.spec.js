context("Given 👤 is in the home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    context("When 👤 navigates to the Historical Data page", () => {
        beforeEach(() => {
            cy.get('a[href*="frontend/history"]').click();
        });

        it("👤 sees a form to load historical currency data", () => {
            cy.get("form").should("be.visible");
        });

        it("the form has a non-empty selector for the SOURCE currency", () => {
            cy.get("form select#source-input > option").should(
                "have.length.gt",
                1,
            );
        });

        it("the form has a non-empty selector for the TARGET currency", () => {
            cy.get("form select#target-input > option").should(
                "have.length.gt",
                1,
            );
        });

        context("When 👤 clicks submit", () => {
            beforeEach(() => {
                cy.get('button[type="submit"]').click();
            });

            it("👤 sees a Exchange rate graph", () => {
                cy.get("svg").should("contain", "Exchange Rate Graph");
            });
        });
    });
});
