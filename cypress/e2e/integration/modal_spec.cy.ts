describe('Character Modal Integration Test', () => {
  before(() => {
    // Simulate login via localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mocked-jwt-token');
    });
    cy.visit('/');
    cy.get('[data-testid="character-card"]').should('exist');
  });

  it('opens modal with correct character info when a card is clicked', () => {
    // Get the first card and click it
    cy.get('[data-testid="character-card"]').first().as('firstCard');

    // Grab the character name before clicking
    cy.get('@firstCard')
      .find('[data-testid="character-name"]')
      .invoke('text')
      .as('selectedCharacterName');

    // Click the card
    cy.get('@firstCard').click();

    // Verify modal opens with correct name
    cy.get('@selectedCharacterName').then((name) => {
      cy.get('[data-testid="character-modal"]').should('be.visible');
      cy.get('[data-testid="modal-character-name"]').should('contain.text', name as string);
    });

    // Check additional modal content
    cy.get('[data-testid="modal-character-height"]').should('exist');
    cy.get('[data-testid="modal-character-mass"]').should('exist');
    cy.get('[data-testid="modal-character-birth-year"]').should('exist');
    cy.get('[data-testid="modal-character-film-count"]').should('exist');
    cy.get('[data-testid="modal-character-created"]').should('exist');

    // Wait and verify homeworld info
    cy.get('[data-testid="modal-homeworld-name"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal-homeworld-terrain"]').should('exist');
    cy.get('[data-testid="modal-homeworld-climate"]').should('exist');
    cy.get('[data-testid="modal-homeworld-population"]').should('exist');
  });
});
