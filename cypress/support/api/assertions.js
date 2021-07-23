class Assertions {
    shouldHaveStatus(response, status){
        expect(response.status, `status is ${status}`).to.eq(status)
    }
    validadeContractOf (response, schema){
        return cy.wrap(response.body).should(
            schema
        )
    }
    shouldBookinIdBePresent(response){
        expect(response.body.bookingid, 'bookingid exists').to.not.be.null
    }

    shouldHaveDefaultHeaders(response){
        expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeAppJson(response){
        expect(response.headers, 'content type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDurationBeFast(response){
        expect (response.duration, 'duration').to.lt(900)
    }

    shouldMessageInvalidMethod(response) {
        expect(response.body, 'Message bounced').to.eq('Method Not Allowed')
    }
}

export default new Assertions ()