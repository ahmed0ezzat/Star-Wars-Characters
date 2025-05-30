describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders login form and allows user to login', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#password').type('testpass');
    cy.get('button[type="submit"]').click();
    // Should redirect to home (token set in localStorage)
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
    });
  });

  it('shows error on invalid login', () => {
    // Overwrite login to throw
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });
    cy.get('input#username').type('baduser');
    cy.get('input#password').type('badpass');
    // Simulate error by clearing localStorage before submit
    cy.get('button[type="submit"]').click();
    cy.get('.bg-red-500/10').should('contain.text', 'Invalid credentials');
  });
});
