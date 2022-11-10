/// <reference types="Cypress" />

describe('Pagina de privacidade', () => {

    it('Testa pagina de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
        
      });
})