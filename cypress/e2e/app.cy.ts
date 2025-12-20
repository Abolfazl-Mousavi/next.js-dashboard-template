describe("Home Page", () => {
	it("should load correctly", () => {
		cy.visit("/")
		cy.location("pathname").should("eq", "/auth/login")
	})
})
