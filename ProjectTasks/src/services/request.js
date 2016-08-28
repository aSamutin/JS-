'use strict';

module.exports = {
    getUsersList: function () {
        return fetch('/api/People')
            .then(response => response.json());
    },
    getUser: function (login) {
        return fetch('/api/People?filter[where][login]='+login)
            .then(response => response.json());
    },
    getTicket: function (ticketId) {
        return fetch('/api/Tickets?filter[where][id]='+ticketId)
            .then(response => response.json());
    },
    getTicketsList: function (ticketsId) {
        let filter = {where: {id: {inq: ticketsId}}};
        filter = 'filter=' + encodeURIComponent(JSON.stringify(filter));
        return fetch(`/api/Tickets?${filter}`)
            .then(response => response.json());
    },
    getComments: function (commentsId) {
        let filter = {where: {id: {inq: commentsId}}};
        filter = 'filter=' + encodeURIComponent(JSON.stringify(filter));
        return fetch(`/api/Comments?${filter}`)
            .then(response => response.json());
    },
    editUser: function (newUser) {
        fetch('/api/People', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
    },
    editTicket: function (newTicket) {
        fetch('/api/Tickets', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTicket)
        });
    },
    saveComment: function (newComment) {
        fetch('/api/Comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newComment)
        });
    },
    saveTicket: function (newTicket) {
        fetch('/api/Tickets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTicket)
        });
    },
    saveUser: function (newUser) {
        fetch('/api/People', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
    },

    activeUser: function (user) {
        var sUser= JSON.stringify(user);
        sessionStorage.setItem('activeUser',sUser);
    }
};
