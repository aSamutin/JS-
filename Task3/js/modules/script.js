var roles = ["Admin", "Client", "Executor"];    //роли
var statuses = ["Open", "Closed"];              //статусы
var priorities = ["Low","Medium","High"];       //Приоритеты
var usersList = ["Admin"];                      //Список пользователей

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

  var Admin = new User("Admin");         //Создание Администратора
  if (!(Admin.id in localStorage)) {  // Сохранение Админа, если его еще нет
    saveObject(Admin);
    saveUser(usersList);
  }

} else {
  alert("Sorry! No Web Storage support..");
}

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
