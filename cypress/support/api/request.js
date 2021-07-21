class Requests {
    //verboRecurso
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping',
        })

    }

}

export default new Requests()