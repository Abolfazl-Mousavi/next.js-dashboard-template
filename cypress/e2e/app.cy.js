describe("Home Page", () => {
  it("should load correctly", () => {
    cy.visit("/");
    cy.contains("Create T3 App");
  });
});
