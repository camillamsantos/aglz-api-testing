class Requests {
    //verboRecurso
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping',
        })
    }
    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/11',
        })
    }
    postBooking() {

        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })

    }
    updateBookingWithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }
    updateBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }

    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token
            Cypress.env('token', token)
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    updateBookingWithInvalidToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env(123)}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James Jr",
                "totalprice": 191,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-12-11",
                    "checkout": "2020-12-12"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateNonExistentBooking(response) {
        const id = 1009
        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James Jr",
                "totalprice": 191,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-12-11",
                    "checkout": "2020-12-12"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithoutToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode: false
        })
    }


    //revisar

    deleBookingInvalidToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env(123)}`
            },
            failOnStatusCode: false
        })
    }


    //revisar
    deleteNonExistentBooking(response) {
        const id = 123
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

}

export default new Requests()
