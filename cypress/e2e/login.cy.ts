// cypress/e2e/login.spec.ts
/// <reference types="cypress" />

context("Auth — Login page (E2E)", () => {
	const route = "/auth/login" // adjust if your login route is different

	beforeEach(() => {
		// If you set baseUrl in cypress.config.ts you can use cy.visit(route)
		cy.visit(route)
	})

	it("renders login form UI", () => {
		cy.get('input[type="email"]')
			.should("exist")
			.and("have.attr", "placeholder", "m@example.com")
		cy.get('input[type="password"]').should("exist")
		cy.get("button[type='submit']").contains(/login/i).should("exist")
		cy.get("button")
			.contains(/continue with github/i)
			.should("exist")
		cy.get("a")
			.contains(/forgot password\?/i)
			.should("have.attr", "href")
			.and("include", "/auth/forgot-password")
		cy.get("a")
			.contains(/sign up/i)
			.should("have.attr", "href")
			.and("include", "/auth/signup")
		cy.get("a")
			.contains(/acme inc\./i)
			.should("exist")
	})
	it("shows client validation errors for invalid email and short password", () => {
		// submit empty/invalid values
		cy.get("button[type='submit']").click()

		// zod resolver will set errors — check for inline errors in FieldError
		// The exact DOM for FieldError may vary; look for the error messages from your zod schema
		cy.contains("Please enter a valid email address.").should("exist")
		cy.contains("Password must be at least 8 characters.").should("exist")

		// now type an invalid email and too-short password and assert invalid state
		cy.get('input[type="email"]').clear().type("not-an-email")
		cy.get('input[type="password"]').clear().type("short")
		cy.get("button[type='submit']").click()

		cy.contains("Please enter a valid email address.").should("exist")
		cy.contains("Password must be at least 8 characters.").should("exist")
	})
})
