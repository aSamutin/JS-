
var $ = require('jquery/dist/jquery');
var _ = require('lodash');
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

var getUser = require('./script').getUser;
var getTickets = require('./script').getTickets;
var getUserList = require('./script').getUserList;

var tmpl = require('../templates/authorization.ejs'); 
document.querySelector('div').innerHTML = tmpl();


$(document).ready(function(){
    $('div').on('click','#entry',function(){
      var usersList = getUserList();
      clientList = _.map(_.filter(usersList, {'role':'Client'}), 'login');
      var user = document.querySelector("input[name = 'username']");
      activeUser = getUser(user.value); 
      
      if(activeUser.login) {
        localStorage.setItem("activeUser",JSON.stringify(user.value)); //запоминаем текущего пользователя
        tmpl = require('../templates/list.ejs');
        var ticketLine = getTickets(activeUser); 
        document.querySelector('div').innerHTML = tmpl({ list: ticketLine, usersList: clientList });
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
