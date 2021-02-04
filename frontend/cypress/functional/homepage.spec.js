const BASEURL = process.env.BASEURL || "http://localhost:3000";

context("Given 👤 is in the home page", () => {
    beforeEach(() => {
        cy.visit(BASEURL);
    });

    it("👤 sees a welcome message", () => {
        cy.get("body").should("contain", "exchange application");
    });

});
