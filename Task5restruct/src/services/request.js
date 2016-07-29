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
      return promise(
        $.ajax({
          type: "GET",
          url: "http://0.0.0.0:3000/api/People",
        })
       );
     },
     getUser: function(login){
       return promise(
         $.ajax({
           type: "GET",
           url: "http://0.0.0.0:3000/api/People?filter[where][login]="+login,
         })
        );
      },
     getTicket: function(ticketId){
       return promise(
         $.ajax({
           type: "GET",
           url: "http://0.0.0.0:3000/api/Tickets?filter[where][id]="+ticketId,
         })
       );
     },
     getTicketsList: function(ticketsId){
       return promise(
         $.ajax({
           type: "GET",
           url: "http://0.0.0.0:3000/api/Tickets?filter={%22where%22: {%22id%22: {%22inq%22: "+JSON.stringify(ticketsId)+"}}}",
         })
       );
     },
     getComments: function(commentsId){
       return promise(
         $.ajax({
           type: "GET",
           url: "http://0.0.0.0:3000/api/Comments?filter={%22where%22: {%22id%22: {%22inq%22: "+JSON.stringify(commentsId)+"}}}",
         })
       );
     },
     saveUser: function(newUser){
       return promise(
         $.ajax({
           type: "POST",
           url: "http://0.0.0.0:3000/api/People" ,
           data: newUser
         }).done(function(msg){
           alert("Новый клиент зарегистрирован");
         })
       );
     },

     editUser: function(newUser){
       return promise(
         $.ajax({
           type: "PUT",
           url: "http://0.0.0.0:3000/api/People" ,
           data: newUser
         }).done(function(msg){
           alert("Пользователь изменен");
         })
       );
     },
     saveTicket: function(newTicket){
       return promise(
         $.ajax({
           type: "POST",
           url: "http://0.0.0.0:3000/api/Tickets" ,
           data: newTicket
         }).done(function(msg){
           alert("Новая заявка");
         })
       );
     },
     editTicket: function(newTicket){
       return promise(
         $.ajax({
           type: "PUT",
           url: "http://0.0.0.0:3000/api/Tickets" ,
           data: newTicket
         }).done(function(msg){
           alert("Заявка изменена");
         })
       );
     },
     saveComment: function(newComment){
       return promise(
         $.ajax({
           type: "POST",
           url: "http://0.0.0.0:3000/api/Comments" ,
           data: newComment
         }).done(function(msg){
           alert("Новая коммент добавлен");
         })
       );
     },

};
