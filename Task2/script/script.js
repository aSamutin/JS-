var roles = ["Admin", "Client", "Executor"];

function User(userName) {
  var id, login, role, ticketsId = [];
  this.ticketsId = [];
  this.id = function(newId) {           //set or get id
    if (!arguments.length) return id;
    this.id = newId;
  };
  this.login = userName;                // set username
  this.role = function(newRole) {      //set or get role users
    if (!arguments.length) return role;
    this.role = newRole;
  };
  this.addticketsId = function(newTicketId) { //add tickets for user
    ticketsId.push(newTicketId);
    this.ticketsId = ticketsId;
  };
}

function Comment() {
  var id, userId, ticketId, text;
  this.id = function(newId) {           //set or get id comment's
    if (!arguments.length) return id;
    this.id = newId;
  };
  this.userId = function(newId) {           //set or get id user
    if (!arguments.length) return userId;
    this.userId = newId;
  };
  this.ticketId = function(newId) {
    if (!arguments.length) return ticketId;
    this.ticketId = newId;
  };
  this.text = function(newText) {
    if (!arguments.length) return text;
    this.text = newText;
  };
}

function Ticket() {
  var id, executorId, clientId, description, priority,
      estimated, deadline, commentId = [], percentReady;
  this.id = function(newId) {
    if (!arguments.length) return id;
    this.id = newId;
  };

  this.executorId = function(newId) {
    if (!arguments.length) return executorId;
    this.executorId = newId;
  };

  this.clientId = function(newId) {
    if (!arguments.length) return clientId;
    this.clientId = newId;
  };

  this.description = function(newDescription) {
    if (!arguments.length) return description;
    this.description = newDescription;
  };

  this.priority = function(newPriority) {
    if (!arguments.length) return priority;
    this.priority = newPriority;
  };

  this.estimated = function(newEstimated) {
    if (!arguments.length) return estimated;
    this.estimated = newEstimated;
  };

  this.deadline = function(newDeadline) {
    if (!arguments.length) return deadline;
    this.deadline = newDeadline;
  };

  this.addCommentId = function(newId) {
    commentId.push(newId);
    this.commentId = commentId;
  };

  this.percentReady = function(newPercentReady) {
    if (!arguments.length) return percentReady;
    this.percentReady = newPercentReady;
  };
}

if(typeof(Storage) !== "undefined") {
  var saveObject = function(object) {
    var sObject = JSON.stringify(object);
    localStorage.setItem(object.id,sObject);
  };
  var getObject = function(id) {
    if (id in localStorage) {
      var object = JSON.parse(localStorage.getItem(id));
      return object;
    }
    return null;
  };
//Тестовые данные
  var Andrey = new User("Андрей");
  Andrey.id(Andrey.login);
  Andrey.role(roles[0]);
  Andrey.addticketsId(45);
  Andrey.addticketsId(48);
  saveObject(Andrey);
  var Vova = new User("Вова");
  Vova.id(Vova.login);
  Vova.role(roles[2]);
  Vova.addticketsId(45);
  saveObject(Vova);
  var ticket1 = new Ticket();
  ticket1.id(45);
  ticket1.executorId(Andrey.login);
  ticket1.clientId(Vova.login);
  ticket1.description("Настроить рабочий стол");
  ticket1.priority("Medium");
  ticket1.estimated(0);
  ticket1.deadline("01.01.2001");
  ticket1.percentReady(45);
  ticket1.addCommentId(222);
  ticket1.addCommentId(22);
  saveObject(ticket1);
  var ticket2 = new Ticket();
  ticket2.id(48);
  ticket2.executorId(Andrey.login);
  ticket2.clientId(Vova.login);
  ticket2.description("Удалить фон");
  ticket2.priority("Medium");
  ticket2.estimated(0);
  ticket2.deadline("01.02.2001");
  ticket2.percentReady(50);
  saveObject(ticket2);
  var comment1 = new Comment();
  comment1.id(222);
  comment1.userId(Andrey.login);
  comment1.ticketId(45);
  comment1.text("Просмотрел html код удалил лишнее");
  saveObject(comment1);
} else {
  alert("Sorry! No Web Storage support..");
}
