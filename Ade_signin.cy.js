// cypress/e2e/signin.cy.js
/// <reference types="cypress" />

import userData from '../data/userData';

describe('User Registration Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
        cy.contains('Create an Account').click();
    });

    it('Verifikasi dapat membuat akun untuk masuk', () => {
         const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;

        // Fill the registration form with valid information from userData.json
         cy.get('#firstname').type(userData.validUser.firstName);
         cy.get('#lastname').type(userData.validUser.lastName);
         // cy.get('#email_address').type(userData.validUser.email);
         cy.get('#email_address').type(randomEmail);
         cy.get('#password').type(userData.validUser.password);
         cy.get('#password-confirmation').type(userData.validUser.password);

    //     // Submit the registration form
         cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

    //     // Verify successful registration message
         cy.get('.message-success').should('be.visible');
     });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan invalid email', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;

        // Fill the registration form with mismatched passwords from userData.json
        cy.get('#firstname').type(userData.invalidUser1.firstName);
        cy.get('#lastname').type(userData.invalidUser1.lastName);
        cy.get('#email_address').type(randomEmail);
        cy.get('#password').type(userData.invalidUser1.password);
        cy.get('#password-confirmation').type('differentpassword');

        // Submit the registration form
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

        // Verify error message for mismatched passwords
        cy.get('#password-confirmation-error').should('be.visible');
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password hanya huruf', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;

        // Fill the registration form with mismatched passwords from userData.json
        cy.get('#firstname').type(userData.invalidUser2.firstName);
        cy.get('#lastname').type(userData.invalidUser2.lastName);
        cy.get('#email_address').type(randomEmail);
        cy.get('#password').type(userData.invalidUser2.password);
        cy.get('#password-confirmation').type('userData.invalidUser2.password');

        // Submit the registration form
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

        // Verify error message for mismatched passwords
        cy.get('#password-confirmation-error').should('be.visible');
    });   

    // Add more test cases for other scenarios related to user registration.
});
