/// <reference types="cypress" />
import spok from 'cy-spok'
import Requests from '../support/api/request'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'


context('Booking', () => {
    before(() => {
        Requests.doAuth()
    });

    it('Validar o contrato do GET booking @contract', () => {
        Requests.getBooking().then(getBookingResponse => {
            cy.log(getBookingResponse.status)
            assertions
                .validadeContractOf(
                    getBookingResponse,
                    schemas
                        .getBookingSchema())
        })

    });
    it('Criar uma reserva com sucesso @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)

            assertions.shouldBookinIdBePresent(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)

        })
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })

    });
    it('Alterar uma reserva com sucesso @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
            })
        })

    });

    it('Tentar excluir uma reserva sem token @functional', () => {

    });

    it('Tentar excluir uma reserva com token inválido @functional', () => {

    });
    it('Excluir uma reserva com sucesso @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })



    });
});

// 1. autenticação
// 2. failOnStatusCode
// 3. reserva existente -> testes independentes

// 2xx
// 3xx

// 1xx
// 4xx
// 5xx

//tentar alterar uma reserva inexistente -> 405
//tentar alterar uma reserva sem token -> 403 - ok
//tentar alterar uma reserva com token invalido -> 403 - ok
//alterar uma reserva com sucesso- > 200 - ok

//tentar excluir uma reserva inexistente -> 405
//tentar excluir uma reserva sem token -> 403 -
//tentar excluir uma reserva com token invalido -> 403
//excluir uma reserva com sucesso -> 201 - ok


//categorização dos testes
// 1. prioridade
// criticos
// medios
//baixa
// 2. tipos
//healthcheck
//contrato
//funcionais
// 3. funcionalidade
//ping
//booking
//auth

// --spec - define somente uma spec por execução

// plugin para selecionar testes: cypress-select-test

