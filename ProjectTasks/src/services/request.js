var _ = require('lodash');
var $ = require('jquery');
var config = require('../app.config');

var timing = config.timing;
var callbackAfter = null;
var returnData = {
    then: function (callback) {
        callbackAfter = callback;
    }
};

var promise = function (data, strong) {
    strong = strong || false;
    var defer = $.Deferred();

    setTimeout(function () {
        if (data || strong == false) {
            defer.resolve(data);
        }
        else {
            defer.reject(data);
        }
    }, timing);

    return defer;
};

module.exports = {
    getUsersList: function(){
        return fetch("/api/People", {
            method: 'GET',
        }).then(function(response){
            return response.json();
        });
    },

    getUser: function(login){
        return fetch("/api/People?filter[where][login]="+login, {
            method: 'GET',
        }).then(function(response){
            return response.json();
        });
     },

     getTicket: function(ticketId){
         return fetch("/api/Tickets?filter[where][id]="+ticketId, {
             method: 'GET',
         }).then(function(response){
             return response.json();
         });
     },

     getTicketsList: function(ticketsId){
         return fetch("/api/Tickets?filter={%22where%22: {%22id%22: {%22inq%22: "+JSON.stringify(ticketsId)+"}}}", {
             method: 'GET',
         }).then(function(response){
             return response.json();
         });
     },

     getComments: function(commentsId){
         return fetch("/api/Comments?filter={%22where%22: {%22id%22: {%22inq%22: "+JSON.stringify(commentsId)+"}}}", {
             method: 'GET',
         }).then(function(response){
             return response.json();
         });
     },

     editUser: function(newUser){
         fetch("/api/People", {
             method: 'PUT',
             headers: {'Content-Type': 'application/json'},
           	 body: JSON.stringify(newUser)
         });
     },

     editTicket: function(newTicket){
        fetch("/api/Tickets", {
           	 method: 'PUT',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(newTicket)
        });
     },

     saveComment: function(newComment){
       fetch("/api/Comments", {
        method: 'POST',
         headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newComment)
       });
     },

     saveTicket: function(newTicket){
       fetch("/api/Tickets", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTicket)
       });
     },

     saveUser: function(newUser){
       fetch("/api/People", {
        method: 'POST',
         headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
       });
     },
     
    activeUser: function(user){ 
	var sUser= JSON.stringify(user);
	sessionStorage.setItem("activeUser",sUser);
    }
};
