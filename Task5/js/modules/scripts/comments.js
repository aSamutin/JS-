var User = require('./script').User;
var roles = require('./script').roles;
var statuses = require('./script').statuses;
var priorities = require('./script').priorities;
var usersList = require('./script').usersList;
var Comment = require('./script').Comment;
var Ticket = require('./script').Ticket;
var saveObject = require('./script').saveObject;
var saveUser = require('./script').saveUser;
var getObject = require('./script').getObject;
var Admin = require('./script').Admin;
var $ = require('jquery/dist/jquery');
var _ = require('lodash');

var getUser = require('./script').getUser;
var getTicket = require('./script').getTicket;
var getUserList = require('./script').getUserList;

$(document).ready(function(){
  $('div').on('click', '#openCreateComment', function(){
    $('#openCreateComment').hide();
    tmpl = require('../templates/new-comment.ejs');
    $('.comments').append(tmpl());
  });
  $('div').on('click', '#addComment', function(){
    var activeUser = getObject("activeUser");
    activeUser = getUser(activeUser);
    var tick = getTicket(+document.querySelector('span').innerHTML);
    var comment = new Comment(Math.random()); 
    var users = getUserList();
    var usersList = _.map(users, 'login');
    var usersId = _.map(users, 'id'); 
    comment.userId = usersList[usersId.indexOf(activeUser.id)];
    comment.ticketId = tick.id;
    comment.text = this.form.comment.value;
    if (tick.commentId[0] == "") {
      tick.commentId.shift();
      tick.commentId.shift();
      tick.commentId.push(comment.id);
    } else {
      tick.commentId.push(comment.id);
    }
      $('.new-comment').hide();
      $('.comments').append(_.template("<div class='comment'> <h3><%=comment.userId%></h3><div><%=comment.text%></div></div>")({comment: comment}));
      $('#openCreateComment').fadeIn();
      comment.userId = activeUser.id;
      
    $.ajax({
      type: "PUT",
      url: "http://0.0.0.0:3000/api/Tickets",
      data: tick
    }).done(function(msg){
      //alert("Заявка изменена");
    });
    
     $.ajax({
      type: "PUT",
      url: "http://0.0.0.0:3000/api/Comments",
      data: comment
    }).done(function(msg){
      //alert("Комментарий добавлен");
    });
    
  });
});
