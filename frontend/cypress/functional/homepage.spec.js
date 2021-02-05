context("Given 👤 is in the home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("👤 sees a welcome message", () => {
        cy.get("body").should("contain", "exchange application");
    });
});
