var roles = ["Admin", "Client", "Executor"];    //роли
var statuses = ["Open", "Closed"];              //статусы
var priorities = ["Low","Medium","High"];       //Приоритеты

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
  this.executorId = undefined;             //id исполнителя
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
  var getObject = function(id) {          //Достать из хранилища
    if (id in localStorage) {
      var object = JSON.parse(localStorage.getItem(id));
      return object;
    }
    return null;
  };
var Andrey = new User("Андрей");
Andrey.addTicketsId("tic1");
Andrey.addTicketsId("tic2");
saveObject(Andrey);
var Vova = new User("Вова");
Vova.role = roles[2];
Vova.addTicketsId("tic1");
saveObject(Vova);
var Nataly = new User("Натали");
Nataly.role = roles[1];
Nataly.addTicketsId("tic1");
saveObject(Nataly);
var comment1 = new Comment("com1");
comment1.userId = Andrey.id;
comment1.ticketId = "tic1";
comment1.text = "Просмотрел html код удалил лишнее";
saveObject(comment1);
var comment2 = new Comment("com2");
comment2.userId = Vova.id;
comment2.ticketId = "tic2";
comment2.text = " удалил лишнее";
saveObject(comment2);
var ticket1 = new Ticket("tic1");
ticket1.executorId = Andrey.id;
ticket1.clientId = Vova.id;
ticket1.description = "Настроить рабочий стол";
ticket1.estimated = 0;
ticket1.deadline = "01.01.2001";
ticket1.percentReady = 45;
ticket1.addCommentId("com1");
ticket1.addCommentId("com2");
saveObject(ticket1);

var ticket2 = new Ticket("tic2");
ticket2.executorId = Andrey.id;
ticket2.clientId = Vova.id;
ticket2.description = "Удалить фон";
ticket2.priority = priorities[2];
ticket2.estimated = 1;
ticket2.deadline = "01.02.2001";
ticket2.percentReady = 50;
ticket2.status = statuses[1];
saveObject(ticket2);
} else {
  alert("Sorry! No Web Storage support..");
}
