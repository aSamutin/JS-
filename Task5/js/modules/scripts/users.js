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

var getUser = require('./script').getUser;
var getUserList = require('./script').getUserList;
var getTickets = require('./script').getTickets;

$(document).ready(function(){
  $('div').on('click', '#openRegistration', function(){
    tmpl = require('../templates/registration.ejs'); 
    document.querySelector('div').innerHTML = tmpl();
  });
  
  $('div').on('click', '#addClient', function(){
      var newUser = new User(this.form.newClient.value);
      newUser.ticketsId.push("");
      newUser.role = roles[1];
      tmpl = require('../templates/authorization.ejs'); 
      document.querySelector('div').innerHTML = tmpl();
      $.ajax({
        type: "POST",
        url: "http://0.0.0.0:3000/api/People" ,
        data: newUser
      }).done(function(msg){
        //alert("Новый клиент зарегистрирован");
      });
  });
  
  $('div').on('click', '#openCreateExecutor', function(){
    tmpl = require('../templates/registration-executor.ejs'); 
    document.querySelector('div').innerHTML = tmpl();
  });
  
  $('div').on('click', '#addExecutor', function(){
     var newUser = new User(this.form.newExecutor.value);
     newUser.role = roles[2];
     newUser.ticketsId.push("");
      $.ajax({
        type: "POST",
        url: "http://0.0.0.0:3000/api/People",
        data: newUser
      }).done(function(msg){
        //alert("Новый исполнитель создан");
        update();
      });
      
  });
});

function update(){
  var activeUser = getObject("activeUser");
  activeUser = getUser(activeUser);
  var usersList = getUserList();
  var clientList = _.map(_.filter(usersList, {'role':'Client'}), 'login') ;
  var ticketLine = getTickets(activeUser); 
  tmpl = require('../templates/list.ejs');   
  document.querySelector('div').innerHTML = tmpl({  list: ticketLine, usersList: clientList});
}


