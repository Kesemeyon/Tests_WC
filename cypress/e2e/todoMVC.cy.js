describe('tests', () => {
  const addTODO = 'add TODO';
  const updateTODO = 'updated TODO';

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react-redux/dist/#/');
  });

  it('Add new TODO', () => {
    //add item to list
    cy.get('[data-testid="text-input"]').type(`${addTODO} {enter}`);
    //make sure only one item added to list
    cy.get('[data-testid="todo-item"]').should('have.length', 1);
    //make sure item was added with correct text
    cy.get('[data-testid="todo-item-label"]').invoke('text').should('eq', addTODO);
  });

  it('Edit TODO', () => {
    cy.get('[data-testid="text-input"]').type(`${addTODO} {enter}`);
    cy.get('[data-testid="todo-item"]').dblclick();
    //make sure item is in edit mode by checking class editing exists
    cy.get('[data-testid="todo-item"].editing').should('exist');
    cy.get('[data-testid="text-input"].edit').clear();
    cy.get('[data-testid="text-input"].edit').type(`${updateTODO} {enter}`);
    cy.get('[data-testid="todo-item"]').should('have.length', 1);
    //make sure text was really updated
    cy.get('[data-testid="todo-item-label"]').invoke('text').should('eq', updateTODO);
  });

  it('Complete TODO', () => {
    cy.get('[data-testid="text-input"]').type(`${addTODO} {enter}`);
    //Mark as completed
    cy.get('[data-testid="todo-item-toggle"]').click();
    cy.get('[data-testid="todo-item"]').should('have.class', 'completed');
    //make sure item was crossed out
    cy.get('[data-testid="todo-item-label"]').should('have.css', 'text-decoration')
      .and('include', 'line-through');
  });

  it('Delete TODO', () => {
    cy.get('[data-testid="text-input"]').type(`${addTODO} {enter}`);
    //Click X to delete
    cy.get('[data-testid="todo-item-button"]').click({ force: true });
    //make sure item and list were deleted
    cy.get('[data-testid="todo-list"]').should('not.exist');
    cy.get('[data-testid="todo-item"]').should('not.exist');
  });

  it('Filter "All" TODOs', () => {
    cy.get('[data-testid="text-input"]').type('first TODO {enter}');
    cy.get('[data-testid="text-input"]').type('second TODO {enter}');
    //click "all" filter
    cy.get('[data-testid="footer-navigation"] a[href="#/"]').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 2);
  });

  it('Filter "Active" TODOs', () => {
    cy.get('[data-testid="text-input"]').type('first TODO {enter}');
    cy.get('[data-testid="text-input"]').type('second TODO {enter}');
    //Mark item as completed
    cy.get('[data-testid="todo-item-toggle"]').eq(0).click();
    //click "active" filter
    cy.get('[data-testid="footer-navigation"] a[href="#/active"]').click();
    //make sure list includes only items that are not completed
    cy.get('[data-testid="todo-item"]').should('have.length', 1).and('not.have.class', 'completed');
  });

  it('Filter "Completed" todos', () => {
    cy.get('[data-testid="text-input"]').type('first TODO {enter}');
    cy.get('[data-testid="text-input"]').type('second TODO {enter}');
    cy.get('[data-testid="todo-item-toggle"]').eq(0).click();
    cy.get('[data-testid="footer-navigation"] a[href="#/completed"]').click();
    //make sure list includes only items that are completed
    cy.get('[data-testid="todo-item"].completed').should('have.length', 1);
  });

  it('Clear completed TODOs', () => {
    cy.get('[data-testid="text-input"]').type('first TODO {enter}');
    cy.get('[data-testid="text-input"]').type('second TODO {enter}');
    cy.get('[data-testid="todo-item-toggle"]').eq(0).click();
    //click the clear completed TODOs btn
    cy.get('.clear-completed').click();
    cy.get('[data-testid="todo-item"]').should('have.length', 1).and('not.have.class', 'completed');
  });

})