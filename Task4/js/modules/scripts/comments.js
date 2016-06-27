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

$(document).ready(function(){
  $('div').on('click', '#openCreateComment', function(){
    $('#openCreateComment').hide();
    tmpl = require('../templates/new-comment.ejs');
    $('.comments').append(tmpl());
  });
  $('div').on('click', '#addComment', function(){
    var activeUser = getObject("activeUser");
    activeUser = getObject(activeUser);
    var tick = getObject(+document.querySelector('span').innerHTML);
    var comment = new Comment(Math.random());
    comment.userId = activeUser.id;
    comment.ticketId = tick.id;
    comment.text = this.form.comment.value;
    if (tick.commentId[0] == null) {
      tick.commentId.shift();
      tick.commentId.push(comment.id);
    } else {
      tick.commentId.push(comment.id);
    }
      $('.new-comment').hide();
      $('.comments').append(_.template("<div class='comment'> <h3><%=comment.userId%></h3><div><%=comment.text%></div></div>")({comment: comment}));
      $('#openCreateComment').fadeIn();
      saveObject(tick);
      saveObject(comment);
  });
});