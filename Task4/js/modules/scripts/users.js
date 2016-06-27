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


$(document).ready(function(){
  $('div').on('click', '#openRegistration', function(){
    tmpl = require('../templates/registration.ejs'); 
    document.querySelector('div').innerHTML = tmpl();
  });
  
  $('div').on('click', '#addClient', function(){
    var newUser = new User(this.form.newClient.value);
    var usersList = getObject("usersList");
    newUser.role = roles[1];
    usersList.push(newUser.id);
    saveObject(newUser);
    saveUser(usersList); 
    tmpl = require('../templates/authorization.ejs'); 
    document.querySelector('div').innerHTML = tmpl();
  });
  
  $('div').on('click', '#openCreateExecutor', function(){
    tmpl = require('../templates/registration-executor.ejs'); 
    document.querySelector('div').innerHTML = tmpl();
  });
  
  $('div').on('click', '#addExecutor', function(){
    var newUser = new User(this.form.newExecutor.value);
    var usersList = getObject("usersList");
    newUser.role = roles[2];
    usersList.push(newUser.id);
    saveObject(newUser);
    saveUser(usersList); 
    update();
  });
});

function update(){
  var activeUser = getObject("activeUser");
  activeUser = getObject(activeUser);
  var usersList = getObject("usersList"); //Массив пользователей
  tmpl = require('../templates/list.ejs'); 
  var ticketLine =[];
  for (i = 0; i < activeUser.ticketsId.length; i++) {
    ticketLine[i] = getObject(activeUser.ticketsId[i]);
  }
  document.querySelector('div').innerHTML = tmpl({ list: ticketLine, usersList: usersList});
}
