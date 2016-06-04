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

openCreateTicket.addEventListener('click', openCreateTicketForm);
addTicket.addEventListener('click',createNewTicket);
openEditTicket.addEventListener('click', openEditTicketForm);
saveEdit.addEventListener('click', saveEditTicket);
openSelectExecutor.addEventListener('click', openSelectExecutorForm);
selectExecutor.addEventListener('click', selectThisExecutor);


function openCreateTicketForm() {             // Открытие формы создания заявки
  document.querySelector('.list-tickets').style.display="none";
  document.querySelector('.new-ticket').style.display="block";
}

function createNewTicket() {             // создание заявки
  var ticket = new Ticket(Math.random());
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
  document.querySelector('.new-ticket').style.display="none";
  document.querySelector('.list-tickets').style.display="block";
}

function openEditTicketForm(){ //открытие формы редактирования заявки
  document.forms[2].estimated.value = document.querySelector(".detail-ticket tr:nth-of-type(2) td:nth-of-type(5)").innerHTML;
  document.forms[2].deadline.value = document.querySelector(".detail-ticket tr:nth-of-type(2) td:nth-of-type(6)").innerHTML;
  document.forms[2].percent.value = document.querySelector(".detail-ticket tr:nth-of-type(2) td:nth-of-type(7)").innerHTML;
  document.forms[2].status.value = "Open";

  document.querySelector(".detail-ticket").style.display = "none";
  document.querySelector(".edit-ticket").style.display = "block";
}

function saveEditTicket() { // Сохранение изменений
  var ticketId = document.querySelector(".detail-ticket h2 span").innerHTML;
  var ticket = getObject(ticketId);
  ticket.estimated = this.form.estimated.value;
  ticket.deadline = this.form.deadline.value;
  ticket.percentReady = this.form.percent.value;
  ticket.status = this.form.status.value;
  saveObject(ticket);
  update();
  document.querySelector(".edit-ticket").style.display = "none";
  document.querySelector(".list-tickets").style.display = "block";
}

function openSelectExecutorForm(){ // Открытие формы назначения исполнителя
  document.querySelector(".detail-ticket").style.display = "none";
  document.querySelector(".select-executor").style.display = "block";
}

function selectThisExecutor(){
  var ticketId = document.querySelector(".detail-ticket h2 span").innerHTML;
  var ticket = getObject(ticketId);
  var executor = getObject(this.form.executors.value);
  ticket.executorId = this.form.executors.value;
  executor.ticketsId.push(ticket.id);
  saveObject(executor);
  saveObject(ticket);
  update();
  document.querySelector(".select-executor").style.display = "none";
  document.querySelector(".list-tickets").style.display = "block";
}

function update(){
  var user = document.querySelector("input[name = 'username']");
  var activeUser = getObject(user.value); //Активный пользователь
  var usersList = getObject("usersList"); //Массив пользователей
  var tableTickets = document.querySelectorAll(".list-tickets tr"); // Коллекция заявок

  if (document.querySelector("div.message")) {  //Удаляем сообщение если оно есть
    document.querySelector("div.message").innerHTML="";
  }
  for (var i = 1; i < tableTickets.length; i++) {
    tableTickets[i].innerHTML = "";             // Зануляем строки таблицы заявок
  }

  if (activeUser.ticketsId.length) {       //если у пользователя есть заявки
    for (i = 0; i < activeUser.ticketsId.length; i++) {
      var ticketLine = getObject(activeUser.ticketsId[i]);
      addTicketItem(ticketLine);
    }
  } else {                          //иначе вывести сообщение
    var listTickets = document.querySelector(".list-tickets");
    var div = document.createElement('div');
    div.innerHTML = "Нет заявок";
    div.className = "message";
    listTickets.appendChild(div);
  }

  document.querySelector("select[name='executors']").innerHTML=""; //Обнуляем селекты
  document.querySelector("select[name='client']").innerHTML="";

  for (i = 1; i < usersList.length; i++) {
    addOption(usersList[i]);
  }

}

function addCommentItem(comment){ // Добавление комментария
  var div = document.createElement('div');
  var commentUser = document.createElement('h3');
  var commentText = document.createElement('div');
  div.appendChild(commentUser);
  div.appendChild(commentText);
  div.className = "comment";
  commentUser.innerHTML = comment.userId;
  commentText.innerHTML = comment.text;
  document.querySelectorAll('.comments')[1].appendChild(div);
}

function addTicketItem(ticketLine){
  var table = document.querySelector("table");
  var tr = document.createElement('tr');
  var td = [];

  for (var i = 0; i < 9; i++) {
    td.push(document.createElement('td'));
    tr.appendChild(td[i]);
  }
  td[0].innerHTML = ticketLine.clientId;
  td[1].innerHTML = ticketLine.executorId;
  td[2].innerHTML = ticketLine.description;
  td[3].innerHTML = ticketLine.priority;
  td[4].innerHTML = ticketLine.estimated;
  td[5].innerHTML = ticketLine.deadline;
  td[6].innerHTML = ticketLine.percentReady;
  td[7].innerHTML = ticketLine.id;
  td[8].innerHTML = ticketLine.status;
  td[7].style.display = "none";
  tr.addEventListener('click', openDetailTicket); //каждой строке назначаем обработчика событий
  table.appendChild(tr);
}

function addOption(usersList){
  var option = document.createElement('option');
  option.value = usersList;
  option.innerHTML = usersList;
  document.querySelector("select[name='executors']").appendChild(option);
  var optionClient = option.cloneNode(true);
  document.querySelector("select[name='client']").appendChild(optionClient);
}

function openDetailTicket(){                        // Детальный просмотр заявки
  var tableDetail =  document.querySelectorAll("table")[1]; //Таблица детального просмотра
  var ticket = getObject(this.children[7].innerHTML); // Текущая заявка
  var tr = this.cloneNode(true);                   // Копирование текущей заявки
  var comments = ticket.commentId;                // массив комментариев
  document.querySelector(".elem").innerHTML = tr.innerHTML;
  document.querySelector(".detail-ticket h2 span").innerHTML = ticket.id;
  document.querySelectorAll(".comments")[1].innerHTML="";
  if (comments[0] == null) {
    comments.shift();
  }
  for (var i = 0; i < comments.length; i++) {
    var addComment = getObject(comments[i]);
    addCommentItem(addComment);
  }
  document.querySelector('.list-tickets').style.display="none";
  document.querySelector('.detail-ticket').style.display="block";
}
