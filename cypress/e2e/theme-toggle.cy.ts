/// <reference types="cypress" />

describe("Theme toggle (shadcn / next-themes)", () => {
	beforeEach(() => {
		// Make sure your dev server is running (or use cy.intercept for fixtures)
		cy.visit("/")
		cy.clearLocalStorage() // start clean
	})

	// ---- Preferred: select by aria-label (if you added aria-label="Toggle theme") ----
	const triggerSelector = 'button[aria-label="Toggle theme"]'

	it("toggles to Dark and persists (localStorage + html class)", () => {
		cy.get(triggerSelector).click() // open dropdown
		cy.contains("Dark").click() // select item
		// next-themes writes the choice to localStorage under "theme"
		cy.window().then((win) => {
			expect(win.localStorage.getItem("theme")).to.equal("dark")
		})
		// If you use attribute="class" on your ThemeProvider, html will get class "dark"
		cy.get("html").should("have.class", "dark")
	})

	it("toggles to Light and persists", () => {
		cy.get(triggerSelector).click()
		cy.contains("Light").click()
		cy.window().then((win) => {
			expect(win.localStorage.getItem("theme")).to.equal("light")
		})
		cy.get("html").should("not.have.class", "dark")
	})

	it("toggles to System and persists", () => {
		cy.get(triggerSelector).click()
		cy.contains("System").click()
		cy.window().then((win) => {
			expect(win.localStorage.getItem("theme")).to.equal("system")
		})
		// NOTE: "system" will follow the OS preference; do not assert html class here
	})
})
