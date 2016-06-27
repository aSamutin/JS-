
var $ = require('jquery/dist/jquery');
require('../style/style.css');
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


var tmpl = require('../templates/authorization.ejs'); 
document.querySelector('div').innerHTML = tmpl();

$(document).ready(function(){
    $('div').on('click','#entry',function(){
      var user = document.querySelector("input[name = 'username']");
      activeUser = getObject(user.value); 
      var usersList = getObject("usersList"); //Массив пользователей
      if(activeUser.login) {
        localStorage.setItem("activeUser",JSON.stringify(user.value)); //запоминаем текущего пользователя  
        tmpl = require('../templates/list.ejs'); 
        var ticketLine =[];
        for (i = 0; i < activeUser.ticketsId.length; i++) {
          ticketLine[i] = getObject(activeUser.ticketsId[i]);
        }
        document.querySelector('div').innerHTML = tmpl({ list: ticketLine, usersList: usersList });
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
    });
});

require('./users');
require('./tickets');
require('./comments');
