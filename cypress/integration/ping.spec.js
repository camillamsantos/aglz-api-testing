/// <reference types="cypress" />
import Requests from '../support/api/request'
import assertions from '../support/api/assertions'


context('Ping', () => {
   it('GET Healthcheck', () => {
        //requests
        Requests.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        })//asserções
        //cy.request -> response -> body, status, headers
        //.its -> retorna propriedade utilizando objeto da ultima propriedade

    });



});

