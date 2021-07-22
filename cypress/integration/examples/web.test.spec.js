require('cypress-file-upload')
require('cypress-xpath')

describe('Upload Resume 1', function () {

    it('Visit the URL', function () {
        cy.visit("https://candidate-qa-exercise.reviews.compono.dev/signin");
    });

    it('Login', function () {
        cy.getElementByCSS('input[type="email"]').type('test@email.com');
        cy.getElementByCSS('input[type="password"]').type('password01');
        cy.getElementByCSS('button[type="submit"]').click();
    });

    it('Upload the Resume', function () {
      cy.get('body').then((body) => {
        if (body.find('svg[class*="CloseIconButton"]').length > 0) {
            cy.get('svg[class*="CloseIconButton"]').click();
        }
      });
      cy.getElementByCSS('label[loading]').click();
      var dialogBox = cy.getElementByCSS('div[data-test-id="upload-dialog"]');
      if(dialogBox!=null)
      {
        const filepath = 'docs/Resume1.docx';
        cy.get('input[name="cv-upload"]').attachFile(filepath);
      }
      cy.contains('Your CV has been uploaded', { timeout: 10000 });
      cy.getElementByCSS('svg[class*="CloseIconButton"]').click();
    });

    it('Check Experience and Skills', function () {
      cy.getElementByCSS('a[href="/profile/experience-and-skills"]').click();
      cy.getElementByCSS('*[class^="InlineHeader"]').contains('Game Designer');

      cy.getElementByCSS('*[class^="InlineHeader"]').then(function($lis){
        expect($lis).to.have.length(2)
        expect($lis.eq(0)).to.contain('Game Designer')
        expect($lis.eq(1)).to.contain('Gameplay Designer')
      })

      cy.getElementByCSS('header h3').then(function($lis){
        expect($lis).to.have.length(2)
        expect($lis.eq(0)).to.contain('NextGen Games')
        expect($lis.eq(1)).to.contain('Q2 BFG')
      })

      cy.xpath("//span[contains(text(),'Date')]//following-sibling::span").then(function($lis){
        expect($lis).to.have.length(2)
        expect($lis.eq(0)).to.contain('Jan 2016 – Jan 2018')
        expect($lis.eq(1)).to.contain('Jan 2013 – Jan 2016')
      })
    });

});


Cypress.Commands.add('getElementByCSS', (path) => {
  return cy.get(path, { timeout: 10000 });
})

