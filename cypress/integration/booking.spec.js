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
    //Itens do desafio:

    it('Tentar alterar uma reserva com token inválido @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.updateBookingWithInvalidToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
            })
        })
    })

    it('Tentar alterar uma reserva inexistente @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.updateNonExistentBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
                assertions.shouldMessageInvalidMethod(putBookingResponse)
            })
        })
    })

    it('Tentar excluir uma reserva sem token @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
            })
        })
    });

    it('Tentar excluir uma reserva com token inválido @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.deleBookingInvalidToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
            })
        })

    });
    it('Excluir uma reserva com sucesso @functional', () => {
        Requests.postBooking().then(postBookingResponse => {
            Requests.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })

        it('Tentar excluir uma reserva inexistente @functional', () => {
            Requests.postBooking().then(postBookingResponse => {
                Requests.deleteNonExistentBooking(postBookingResponse).then(deleteBookingResponse => {
                    assertions.shouldHaveStatus(deleteBookingResponse, 405)
                    assertions.shouldMessageInvalidMethod(deleteBookingResponse)
                })
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

//tentar alterar uma reserva inexistente -> 405 - ok
//tentar alterar uma reserva sem token -> 403 - ok
//tentar alterar uma reserva com token invalido -> 403 - ok
//alterar uma reserva com sucesso- > 200 - ok

//tentar excluir uma reserva inexistente -> 405 - ok
//tentar excluir uma reserva sem token -> 403 - ok
//tentar excluir uma reserva com token invalido -> 403 - ok
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

