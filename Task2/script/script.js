function User(userName) {
  var id, login, role, ticketsId = [];
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
  var id, userId, text;
  this.id = function(newId) {           //set or get id comment's
    if (!arguments.length) return id;
    this.id = newId;
  };
  this.userId = function(newId) {           //set or get id user
    if (!arguments.length) return userId;
    this.userId = newId;
  };
  this.text = function(newText) {           //set or get id
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
  var saveUser = function(object) {
    var sObject = JSON.stringify(object);
    localStorage.setItem(object.login,sObject);
  };
  var saveObgect = function(object) {
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

  var Andrey = new User("Андрей");
  Andrey.id(1);
  Andrey.role("Admin");
  Andrey.addticketsId(45);
  Andrey.addticketsId(48);
  saveUser(Andrey);


} else {
  alert("Sorry! No Web Storage support..");
}
