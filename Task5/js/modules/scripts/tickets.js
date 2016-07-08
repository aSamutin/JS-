var User = require('./script').User;
var roles = require('./script').roles;
var statuses = require('./script').statuses;
var priorities = require('./script').priorities;
var usersList = require('./script').usersList;
var Comment = require('./script').Comment;
var Ticket = require('./script').Ticket;
var hTable = require('./script').hTable;
var saveObject = require('./script').saveObject;
var saveUser = require('./script').saveUser;
var getObject = require('./script').getObject;
var Admin = require('./script').Admin;
var $ = require('jquery/dist/jquery');
var _ = require('lodash');

var getUser = require('./script').getUser;
var getUserList = require('./script').getUserList;
var getTickets = require('./script').getTickets;
var getTicket = require('./script').getTicket;
var getComments = require('./script').getComments;

$(document).ready(function(){
  $('div').on('click','#openCreateTicket', function () {
    var usersList = getUserList(); //Массив пользователей 
    var clientList = _.map(_.filter(usersList, {'role':'Client'}), 'login');
    tmpl = require('../templates/new-ticket.ejs'); 
    document.querySelector('div').innerHTML = tmpl({usersList:clientList});
  });
  
  $('div').on('click','#addTicket', function () {
    var ticket = new Ticket(Math.round((Math.random()*10000)));
    var client = getUser(this.form.client.value);
    var users = getUserList();
    var usersList = _.map(users, 'login');
    var usersId = _.map(users, 'id');  
    var admin = getUser("Admin");  
    ticket.clientId = usersId[usersList.indexOf(this.form.client.value)];
    ticket.executorId = -1;
    ticket.description = this.form.details.value;
    ticket.estimated = this.form.estimated.value; 
    ticket.deadline = this.form.deadline.value;
    ticket.percentReady = this.form.percent.value;
    ticket.priority = this.form.priority.value;
    ticket.status = this.form.status.value;  
    ticket.addCommentId("");
    if (admin.ticketsId[0]==""){
        admin.ticketsId.shift();
    }
     if (client.ticketsId[0]==""){
        client.ticketsId.shift();
    }
    admin.ticketsId.push(ticket.id);
    client.ticketsId.push(ticket.id);
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:3000/api/Tickets",
      data: ticket
    }).done(function(msg){
      //alert("Новая заявка создана");
      
      $.ajax({
        type: "PUT",
        url: "http://0.0.0.0:3000/api/People",
        data: client
      }).done(function(msg){
        //alert("Клиент изменен");
        $.ajax({
          type: "PUT",
          url: "http://0.0.0.0:3000/api/People",
          data: admin
        }).done(function(msg){
          //alert("Админ изменен");
           update();
        });
      });
    });
  });
  
  $('div').on('click','.headSort th', function () {
    var activeUser = getObject("activeUser");
    var usersList = getUserList();
    var clientList = _.map(_.filter(usersList, {'role':'Client'}), 'login');
    activeUser = getUser(activeUser);
    var ticketLine = getTickets(activeUser); 
    var key = hTable[this.innerHTML];
    var sortTickets = _.sortBy(ticketLine, function(ticket){ return ticket[key]; });
    tmpl = require('../templates/list.ejs'); 
    document.querySelector('div').innerHTML = tmpl({ list: sortTickets, usersList: clientList });
  });
  
  $('div').on('click','.line', function () {
   localStorage.setItem("activeTicket",JSON.stringify(+this.children[0].innerHTML));     
   var tick = getTicket(+this.children[0].innerHTML);
   getUser('Admin');
   var users = getUserList();
   var usersList = _.map(users, 'login');
   var usersId = _.map(users, 'id');    
   tick.executorId = usersList[usersId.indexOf(+tick.executorId)];
   tick.clientId = usersList[usersId.indexOf(+tick.clientId)];   
   var comments = getComments(tick); 
   tmpl = require('../templates/detail.ejs');  
   document.querySelector('div').innerHTML = tmpl({ticket: tick,comment:comments});
   var activeUser = getObject("activeUser");
   activeUser = getUser(activeUser);
   if (activeUser.role != roles[0]) {
     $('#openSelectExecutor').hide();
   } 
  });
  
  $('div').on('click','#openEditTicket', function () {
    var tick = getObject("activeTicket");
    tick = getTicket(tick);  
    tmpl = require('../templates/edit-ticket.ejs');
    document.querySelector('div').innerHTML = tmpl({ticket: tick});
    if (activeUser.role != roles[0]) {
      $(".estimated").hide();
      $(".deadline").hide();
    }
  });
  
  $('div').on('click','#saveEdit', function () {
    var tick = getObject("activeTicket");
    tick = getTicket(tick);  
    tick.estimated = this.form.estimated.value;
    tick.deadline = this.form.deadline.value;
    tick.percentReady = this.form.percent.value;
    tick.status = this.form.status.value;
    
    $.ajax({
      type: "PUT",
      url: "http://0.0.0.0:3000/api/Tickets",
      data: tick
    }).done(function(msg){
      //alert("Заявка изменена");
      update();
    });
  });
  
  $('div').on('click','#openSelectExecutor', function () {
    var usersList = getUserList(); //Массив пользователей
    var executorList = _.map(_.filter(usersList, {'role':'Executor'}), 'login');
    tmpl = require('../templates/select-executor.ejs');
    document.querySelector('div').innerHTML = tmpl({usersList: executorList});
  });
  
  $('div').on('click','#selectExecutor', function () {
    var tick = getObject("activeTicket");
    var users = getUserList();
    var usersList = _.map(users, 'login');
    var usersId = _.map(users, 'id');   
    tick = getTicket(tick);
    tick.executorId = usersId[usersList.indexOf(this.form.executors.value)];
    var executor = getUser(this.form.executors.value);
    executor.ticketsId.push(tick.id);
    
    $.ajax({
      type: "PUT",
      url: "http://0.0.0.0:3000/api/People",
      data: executor
    }).done(function(msg){
      //alert("Пользователь назначен");
      $.ajax({
        type: "PUT",
        url: "http://0.0.0.0:3000/api/Tickets",
        data: tick
      }).done(function(msg){
        //alert("Заявка изменена");
        update();
      });
    });
  });

  $('div').on('click', '#filter', function(){
    var activeUser = getObject("activeUser");
    activeUser = getUser(activeUser);
    var ticketLine =getTickets(activeUser);
    var usersList = getUserList();
    var clientList = _.map(_.filter(usersList, {'role':'Client'}), 'login');
   
    if ((this.form.client.value == 'All') && (this.form.status.value == 'All')){
      var filterTickets = ticketLine;
    } else if (this.form.client.value == 'All') {
      var filterTickets = _.filter(ticketLine, {status:this.form.status.value});  
    } else if (this.form.status.value == 'All') {
      var filterTickets = _.filter(ticketLine, {clientId:this.form.client.value});  
    } else {
      var filterTickets = _.filter(ticketLine, {clientId:this.form.client.value, status:this.form.status.value});  
    } 
    tmpl = require('../templates/list.ejs'); 
    document.querySelector('div').innerHTML = tmpl({ list: filterTickets, usersList: clientList});
    document.querySelector('select[name="client"]').value = this.form.client.value;
    document.querySelector('select[name="status"]').value = this.form.status.value;
    switch (activeUser.role) {
    case roles[2]:
      $('#openCreateTicket').hide();
      $('#openCreateExecutor').hide();
    break;
    case roles[1]:
      $('#openCreateExecutor').hide();
    break;
    default:
  }
  });
  
  $('div').on('click', '#find', function(){
    var Admin = getUser("Admin"); 
    var ticketLine = getTickets(Admin); 
    var users = getUserList();
    var clientList = _.map(_.filter(users, {'role':'Client'}), 'login');

    var searchTicket=[];
    searchTicket[0] = _.find(ticketLine, {id: +this.form.search.value});   
    tmpl = require('../templates/list.ejs'); 
    document.querySelector('div').innerHTML = tmpl({ list: searchTicket, usersList: clientList});
    switch (activeUser.role) {
    case roles[2]:
      $('#openCreateTicket').hide();
      $('#openCreateExecutor').hide();
    break;
    case roles[1]:
      $('#openCreateExecutor').hide();
    break;
    default:
  }
   
  });
});


function update(){
  var activeUser = getObject("activeUser");
  activeUser = getUser(activeUser);
  var users = getUserList();
  var clientList = _.map(_.filter(users, {'role':'Client'}), 'login');
  var ticketLine = getTickets(activeUser); 
  
  tmpl = require('../templates/list.ejs');   
  
  document.querySelector('div').innerHTML = tmpl({ list: ticketLine, usersList: clientList});
  switch (activeUser.role) {
    case roles[2]:
      $('#openCreateTicket').hide();
      $('#openCreateExecutor').hide();
    break;
    case roles[1]:
      $('#openCreateExecutor').hide();
    break;
    default:
  }
}



   
