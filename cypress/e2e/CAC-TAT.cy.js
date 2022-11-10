/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html');
  })

  it('verifica o tituloda aplicação', () => {
    
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preencher os campos obrigatorios e enviar', () => {
    cy.get('#firstName')
    .type('Lucascomnomegigantescoquenuncaexistigiranumasituacaonormal', {delay: 1});

    cy.get('#lastName')
    .type('Athayde Dutra')

    cy.get('#email')
    .type('abobrinha123@gmail.com')

    cy.get('#open-text-area')
    .type('Pika d+ irmão, ideia mermo')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Ex extra 2 - Exibe error', () => {
    cy.get('#firstName')
    .type('Lucascomnomegigantescoquenuncaexistigiranumasituacaonormal', {delay: 1});

    cy.get('#lastName')
    .type('Athayde Dutra')

    cy.get('#email')
    .type('abobrinha123@gmailcom')

    cy.get('#open-text-area')
    .type('Pika d+ irmão, ideia mermo')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Ex extra 3 - Campo de telefone so com numeros', () => {
    
    cy.get('#phone').type('abc').should('have.value', '')

  })

  it('EXX4 - Telefone obrigatorio não preenchido', () => {
    cy.get('#firstName')
    .type('Lucas');

    cy.get('#lastName')
    .type('Athayde Dutra')

    cy.get('#email')
    .type('abobrinha123@gmail.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area')
    .type('Teste teste teste teste teste de escrita longa teste teste teste teste teste teste teste teste teste', {delay: 5})

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('EXX5 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Lucas')
    .should('not.have.value', '')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Athayde Dutra')
    .should('not.have.value', '')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('abobrinha123@gmail.com')
    .should('not.have.value', '')
    .clear()
    .should('have.value', '')
  
    cy.get('#phone')
    .type('18378237')
    .should('not.have.value', '')
    .clear()
    .should('have.value', '')

  })

  it('EXX6 - Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('EXX7 - Envia form com sucesso utilizando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('EXX8 - Enviar form utilizando Contains', () => {

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube')
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
    cy.get('select').select(1).should('have.value', 'blog')
});

  it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
  });

  it('Marca cada tipo de atendimento', () => {
      cy.get('[type="radio"]').each(function($radio){
          cy.wrap($radio).check().should('be.checked')
      })
  });

  it('Marca ambos checkboxes, depois desmarca o ultimo', () => {
      cy.get('[type="checkbox"]')
      .check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
      
  });

  it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('[type="file"]').selectFile('./cypress/fixtures/example.json')
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo da pasta fixtures com drag n drop', () => {
      cy.get('[type="file"]').selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('examplefile')
      cy.get('[type="file"]')
      .selectFile('@examplefile', {action: "drag-drop"})
      .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank' )
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();
    cy.contains('Talking About Testing').should('be.visible')
  });

})