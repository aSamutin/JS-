var $ = require('jquery/dist/jquery');
var _ = require('lodash');
var roles = ["Admin", "Client", "Executor"];    //роли
var statuses = ["Open", "Closed"];              //статусы
var priorities = ["Low","Medium","High"];       //Приоритеты
var usersList = ["Admin"];                      //Список пользователей
var hTable = {
  "Номер заявки": "id",
  "Клиент": "clientId",
  "Исполнитель": "executorId",
  "Описание": "description",
  "Приоритет": "priority",
  "Estimated": "estimated",
  "Deadline": "deadline",
  "Готовность(%)": "percentReady",
  "Статус": "status",
};

function User(userName) {                    //Конструктор пользователя
  var ticketsId = [];
  this.id = userName;                        //id
  this.login = userName;                     //Логин
  this.ticketsId = [];                       //Массив заявок
  this.role = roles[0];                      //Роль по умолчанию Admin

  this.addTicketsId = function(newTicketId) { //Добавление заявки пользователю
    ticketsId.push(newTicketId);
    this.ticketsId = ticketsId;
  };
}

function Comment(id) {                     //Конструктор комментария
  this.id = id;                            //id комментария
  this.userId = undefined;                 //id пользователя
  this.ticketId = undefined;               //id заявки
  this.text = "Текст коммантария";         // текст комментария
}

function Ticket(id) {                      //Конструктор заявки
  var commentId = [];
  this.id = id;                            //id заявки
  this.executorId = "Не назначен";             //id исполнителя
  this.clientId = undefined;               //id клиента
  this.status = statuses[0];                //статус (по умолчанию Open)
  this.description = "Описание";           //Описание
  this.priority = priorities[1];           //Приорите (по умолчанию Medium)
  this.estimated = 0;
  this.deadline = undefined;
  this.percentReady = 0;

  this.addCommentId = function(newId) {    //Добавление комментария заявке
    commentId.push(newId);
    this.commentId = commentId;
  };
}
if(typeof(Storage) !== "undefined") {

  var saveObject = function(object) {      //Сохранить объект в localStorage
    var sObject = JSON.stringify(object);
    localStorage.setItem(object.id,sObject);
  };

  var saveUser = function(usersList){      // Сохранение массива пользователей
    var sObject = JSON.stringify(usersList);
    localStorage.setItem("usersList",sObject);
  };

  var getObject = function(id) {          //Достать из хранилища
    if (id in localStorage) {
      var object = JSON.parse(localStorage.getItem(id)); 
      return object;
    }
    return null;
  };

  var Admin = getUser("Admin");
  if (Admin == null) {
      Admin = new User("Admin");
      Admin.ticketsId.push("");
      $.ajax({
        type: "POST",
        url: "http://0.0.0.0:3000/api/People" ,
        data: Admin
      });
  }
} else {
  alert("Sorry! No Web Storage support..");
}

//////////////////////////// Работа с сервером//////////////////////////////        
   

function getUser(login){
 var result = null;   
 $.ajax({
        type: "GET",
        url: "http://0.0.0.0:3000/api/People",
        async: false
  })
  .done(function(users){
    for(var i = 0; i < users.length; i++ ){
      if(users[i].login == login){
         result = users[i]; 
      }
    };
  });
  return result; 
};


function getTickets(user){
   var userTickets = []; 
   $.ajax({
        type: "GET",
        url: "http://0.0.0.0:3000/api/Tickets",
        async: false
   })
   .done(function(tickets){
      userTickets = _.filter(tickets, function(tick){ return user.ticketsId.indexOf(String(tick.id))!=-1});
      var users = getUserList();
      var usersList = _.map(users, 'login');
      var usersId = _.map(users, 'id');  
   
      for(var i = 0; i < userTickets.length; i++ ){
        userTickets[i].executorId = usersList[usersId.indexOf(+userTickets[i].executorId)];
        userTickets[i].clientId = usersList[usersId.indexOf(+userTickets[i].clientId)];
      };
      
   });
   
   return userTickets;
}

function getTicket(id){
    var result;
    $.ajax({
        type: "GET",
        url: "http://0.0.0.0:3000/api/Tickets/"+id,
        async: false
   })
   .done(function(ticket){
        result = ticket;
   });
   
   return result;
}

function getUserList(){
 var result = null;   
 $.ajax({
        type: "GET",
        url: "http://0.0.0.0:3000/api/People",
        async: false
  })
  .done(function(users){
    result = users; 
  });
  return result;  
};

function getComments(ticket){
   var comments = []; 
   $.ajax({
        type: "GET",
        url: "http://0.0.0.0:3000/api/Comments",
        async: false
   })
   .done(function(comm){
      var users = getUserList();
      var usersList = _.map(users, 'login');
      var usersId = _.map(users, 'id');
      for(var i = 0; i < comm.length; i++ ){
        if (comm[i].ticketId == ticket.id){
          comm[i].userId = usersList[usersId.indexOf(+comm[i].userId)]  
          comments.push(comm[i]);
        }
      }; 
   });
   
   return comments;
}

module.exports.getComments = getComments;   
module.exports.getUserList = getUserList;
module.exports.getUser = getUser;    
module.exports.getTickets = getTickets;
module.exports.getTicket = getTicket;
module.exports.saveObject = saveObject;
module.exports.saveUser = saveUser;
module.exports.getObject = getObject;
module.exports.Admin = Admin;
module.exports.User = User;
module.exports.roles = roles;
module.exports.statuses = statuses;
module.exports.priorities = priorities;
module.exports.usersList = usersList;
module.exports.Comment = Comment;
module.exports.Ticket = Ticket;
module.exports.hTable = hTable;