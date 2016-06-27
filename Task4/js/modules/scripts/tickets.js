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

$(document).ready(function(){
  $('div').on('click','#openCreateTicket', function () {
    var usersList = getObject("usersList"); //Массив пользователей 
    tmpl = require('../templates/new-ticket.ejs'); 
    document.querySelector('div').innerHTML = tmpl({usersList:usersList});
  });
  
  $('div').on('click','#addTicket', function () {
    var ticket = new Ticket(Math.round((Math.random()*10000)));
    var client = getObject(this.form.client.value);
    var admin = getObject("Admin");
    ticket.clientId = this.form.client.value;
    ticket.description = this.form.details.value;
    ticket.estimated = this.form.estimated.value;
    ticket.deadline = this.form.deadline.value;
    ticket.percentReady = this.form.percent.value;
    ticket.priority = this.form.priority.value;
    ticket.status = this.form.status.value;
    ticket.addCommentId();
    admin.ticketsId.push(ticket.id);
    client.ticketsId.push(ticket.id);
    saveObject(client);
    saveObject(admin);
    saveObject(ticket);
    update();
  });
  
  $('div').on('click','.headSort th', function () {
    var activeUser = getObject("activeUser");
    activeUser = getObject(activeUser);
    var ticketLine =[];
    for (i = 0; i < activeUser.ticketsId.length; i++) {
      ticketLine[i] = getObject(activeUser.ticketsId[i]);
    }
    var key = hTable[this.innerHTML];
    var sortTickets = _.sortBy(ticketLine, function(ticket){ return ticket[key]; });
    tmpl = require('../templates/list.ejs'); 
    document.querySelector('div').innerHTML = tmpl({ list: sortTickets});
  });
  
  $('div').on('click','.line', function () {
   localStorage.setItem("activeTicket",JSON.stringify(+this.children[0].innerHTML));    
   var tick = getObject(+this.children[0].innerHTML);
   var comments = [];
   for (i = 0; i < tick.commentId.length; i++) {
     comments[i] = getObject(tick.commentId[i]);
   }
   if (comments[0] == null) {
     comments.shift();
   }
   tmpl = require('../templates/detail.ejs');  
   document.querySelector('div').innerHTML = tmpl({ticket: tick,comment:comments});
   var activeUser = getObject("activeUser");
   activeUser = getObject(activeUser);
   if (activeUser.role != roles[0]) {
     $('#openSelectExecutor').hide();
   } 
  });
  
  $('div').on('click','#openEditTicket', function () {
    var tick = getObject("activeTicket");
    tick = getObject(tick);  
    tmpl = require('../templates/edit-ticket.ejs');
    document.querySelector('div').innerHTML = tmpl({ticket: tick});
    if (activeUser.role != roles[0]) {
      $(".estimated").hide();
      $(".deadline").hide();
    }
  });
  
  $('div').on('click','#saveEdit', function () {
    var tick = getObject("activeTicket");
    tick = getObject(tick);  
    tick.estimated = this.form.estimated.value;
    tick.deadline = this.form.deadline.value;
    tick.percentReady = this.form.percent.value;
    tick.status = this.form.status.value;
    saveObject(tick);
    update();       
  });
  
  $('div').on('click','#openSelectExecutor', function () {
    var usersList = getObject("usersList"); //Массив пользователей
    tmpl = require('../templates/select-executor.ejs');
    document.querySelector('div').innerHTML = tmpl({usersList: usersList});
  });
  
  $('div').on('click','#selectExecutor', function () {
    var tick = getObject("activeTicket");
    tick = getObject(tick);
    tick.executorId = this.form.executors.value;
    var executor = getObject(this.form.executors.value);
    executor.ticketsId.push(tick.id);
    saveObject(executor);
    saveObject(tick);
    update();
  });
  
  $('div').on('click', '#filter', function(){
    var activeUser = getObject("activeUser");
    activeUser = getObject(activeUser);
    var usersList = getObject("usersList"); //Массив пользователей
    var ticketLine =[];
    for (i = 0; i < activeUser.ticketsId.length; i++) {
      ticketLine[i] = getObject(activeUser.ticketsId[i]);
    }
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
    document.querySelector('div').innerHTML = tmpl({ list: filterTickets, usersList: usersList});
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
    var Admin = getObject("Admin"); 
    var usersList = getObject("usersList"); //Массив пользователей
    var ticketLine =[]; 
    for (i = 0; i < Admin.ticketsId.length; i++) {
      ticketLine[i] = getObject(Admin.ticketsId[i]);
    }
    var searchTicket=[];
    searchTicket[0] = _.find(ticketLine, {id: +this.form.search.value});   
    tmpl = require('../templates/list.ejs'); 
    document.querySelector('div').innerHTML = tmpl({ list: searchTicket, usersList: usersList});
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
  activeUser = getObject(activeUser);
  var usersList = getObject("usersList"); //Массив пользователей
  tmpl = require('../templates/list.ejs'); 
  var ticketLine =[];
  for (i = 0; i < activeUser.ticketsId.length; i++) {
    ticketLine[i] = getObject(activeUser.ticketsId[i]);
  }
  document.querySelector('div').innerHTML = tmpl({ list: ticketLine, usersList: usersList});
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
