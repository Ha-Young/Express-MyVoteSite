/// <reference types="Cypress" />

const SAMPLE_EMAIL = 'sampleEmail@google.com';
const SAMPLE_PASSWORD = 'samplePassword123';
const SAMPLE_NICKNAME = 'sampleNickname';
const sampleUser = {
  email: SAMPLE_EMAIL,
  password: SAMPLE_PASSWORD,
  nickname: SAMPLE_NICKNAME,
}
const SAMPLE_VOTING_TITLE = 'SAMPLE_VOTING_TITLE';
const SAMPLE_POLL_TITLE_1 = 'SAMPLE_POLL_TITLE_1';
const SAMPLE_POLL_TITLE_2 = 'SAMPLE_POLL_TITLE_2';
const SAMPLE_POLL_TITLE_3 = 'SAMPLE_POLL_TITLE_3';
const SAMPLE_VOTING_DATE = '';

const login = () => {
  cy.get('.logo').click();
  cy.get('[href="/login"]').click();

  cy.get('[type="email"]').should('have.attr', 'autofocus');

  cy.get('[type="email"]').type(SAMPLE_EMAIL);
  cy.get('[type="password"]').type(SAMPLE_PASSWORD);

  cy.get('button').click();
};

const makeVoting = () => {
  cy.get('.logo').click();
  cy.get('[href="/votings/new"]').click();

  cy.get('[name="voting_title"]').type(SAMPLE_VOTING_TITLE);
  cy.get(':nth-child(1) > input').type(SAMPLE_POLL_TITLE_1);
  cy.get('.js-polls > :nth-child(2) > input').type(SAMPLE_POLL_TITLE_2);

  cy.get('.js-addBtn').click();

  cy.get('.js-polls > :nth-child(3) > input').type(SAMPLE_POLL_TITLE_3);

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  cy.get('[type="date"]').type(`${year}-${month}-${date}`);
  cy.get('form > .container > button').click();
};

const vote = () => {
  cy.get('.logo').click();
  cy.get('[href="/my-page"]').click();
  cy.get('.title').click();

  cy.get('li:nth-child(1) > .poll-container > ul').click({ multiple: true });
};

const deleteVoting = () => {
  cy.get('.logo').click();
  cy.get('[href="/my-page"]').click();

  cy.get('.title').click();
  cy.get('.delete-button').click();
}

const logout = () => {
  cy.get('.logo').click();
  cy.get('[href="/logout"]').click();
};

context('Actions', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('make and delete voting test', () => {
    login();
    makeVoting();
    vote();
    deleteVoting();
  });
});
