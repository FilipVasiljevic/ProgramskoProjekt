describe("My First Test", () => {
  it("Posjeta stranici", () => {
    cy.visit("http://localhost:8080/#/");
    cy.contains("submitForm");
  });
});
