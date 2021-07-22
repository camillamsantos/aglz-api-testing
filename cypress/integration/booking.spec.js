/// <reference types="cypress" />
import spok from 'cy-spok'
import Requests from '../support/api/request'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'


context('Bookink', () => {

    it('Validar o contrato do GET booking', () => {
        Requests.getBooking().then(getBookingResponse => {
            cy.log(getBookingResponse.status)
            assertions
                .validadeContractOf(
                    getBookingResponse,
                    schemas
                        .getBookingSchema())
        })

    });
    it('Criar uma reserva com sucesso', () => {
        Requests.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)

            assertions.shouldBookinIdBePresent(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)

        })
    });

    //tentar alterar uma reserva sem token -> 403
    //tentar alterar uma reserva com token invalido -> 403
    //alterar uma reserva com sucess- > 200
    it.only('Tentar alterar uma reserva sem token', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })

    });
});

// 1. autenticação
// 2. failOnStatusCode
// 3. reserva existente -> testes independentes

