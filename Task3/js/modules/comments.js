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

openCreateComment.addEventListener('click',openCreateCommentForm);
addComment.addEventListener('click', createNewComment);

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

function openCreateCommentForm(){
  openCreateComment.style.display="none";
  document.querySelector('.new-comment').style.display="block";
}

function createNewComment(){
  var user = document.querySelector("input[name = 'username']");
  var activeUser = getObject(user.value);
  var comment = new Comment(Math.random());
  comment.userId = activeUser.id;
  comment.ticketId = document.querySelector(".detail-ticket h2 span").innerHTML;
  comment.text = this.form.comment.value;
  var ticket = getObject(comment.ticketId);
  if (ticket.commentId[0] == null) {
    ticket.commentId.shift();
    ticket.commentId.push(comment.id);
  } else {
    ticket.commentId.push(comment.id);
  }

  saveObject(ticket);
  saveObject(comment);
  addCommentItem(comment);
  document.querySelector('.new-comment').style.display="none";
  openCreateComment.style.display="block";
  update();
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
