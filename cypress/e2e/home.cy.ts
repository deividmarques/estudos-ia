/// <reference types="cypress" />

describe('Página Home', () => {
  it('deve exibir o título principal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Exemplos de Componentes MUI').should('be.visible');
  });

  it('deve alternar entre Light Mode e Dark Mode', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Light Mode').click();
    cy.contains('Dark Mode').should('be.visible');
    cy.contains('Dark Mode').click();
    cy.contains('Light Mode').should('be.visible');
  });

  it('deve exibir o botão Enviar ao acessar Fale Conosco', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Fale Conosco').click();
    cy.contains('button', 'Enviar').should('be.visible');
  });
});
