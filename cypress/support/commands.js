// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to highlight element
Cypress.Commands.add('highlightBrokenLink', (element) => {
    cy.wrap(element).then(($el) => {
        $el.css({
            'background-color': 'red',
            'color': 'white',
            'border': '3px solid darkred',
            'padding': '2px 5px',
            'font-weight': 'bold',
            'box-shadow': '0 0 10px red'
        });
    });
});
