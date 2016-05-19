entry.addEventListener('click', authorization);
openCreateTicket.addEventListener('click', openCreateTicketForm);
addTicket.addEventListener('click',createNewTicket);
openCreateComment.addEventListener('click',openCreateCommentForm);
addComment.addEventListener('click', createNewComment);
openEditTicket.addEventListener('click', openEditTicketForm);
saveEdit.addEventListener('click', saveEditTicket);
var addCom="true";
var activeUser;
function authorization() {
  var user = document.querySelector("input[name = 'username']");
  activeUser = getObject(user.value);
  if(activeUser.login) {                              //Если правильный логин
    document.querySelector('.list-tickets').style.display = "block";
    document.querySelector('.authorization').style.display = "none";

    if (activeUser.role == roles[2]) { //Скрываем кнопку для всех исполнителей
      document.getElementById("openCreateTicket").style.display = "none";
    }

    if (activeUser.ticketsId.length) { //если у пользователя есть заявки

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
  }
}

function addTicketItem(ticketLine){
  var table = document.querySelector("table");
  var tr = document.createElement('tr');
  var td = [];

  for (var i = 0; i < 10; i++) {
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
  td[7].innerHTML = ticketLine.commentId;
  td[8].innerHTML = ticketLine.id;
  td[9].innerHTML = ticketLine.status;
  td[7].style.display = "none";
  td[8].style.display = "none";
  tr.addEventListener('click', openDetailTicket); //каждой строке назначаем обработчика событий
  table.appendChild(tr);
}

function openDetailTicket(){
  document.querySelector('.list-tickets').style.display="none";
  document.querySelector('.detail-ticket').style.display="block";
  if (activeUser.role == roles[1]) {
    openEditTicket.style.display ="none";
  }
  var tableDetail =  document.querySelectorAll("table")[1];
  document.querySelector(".detail-ticket h2 span").innerHTML =
           this.children[8].innerHTML;
  var newTr = event.currentTarget.cloneNode(true);
  document.getElementsByClassName("elem")[0].innerHTML = newTr.innerHTML;
  document.querySelectorAll(".comments")[1].innerHTML="";
  var comments = event.currentTarget.children[7].innerHTML.split(",");
  for (var i = 0; i < comments.length; i++) {
    var addComment = getObject(comments[i]);
    addCommentItem(addComment);
  }


}

function openCreateTicketForm(){
  document.querySelector('.list-tickets').style.display="none";
  document.querySelector('.new-ticket').style.display="block";
}

function createNewTicket(){
  var ticket = new Ticket("tic1");
  ticket.executorId = this.form.executor.value;
  ticket.clientId = this.form.client.value;
  ticket.description = this.form.details.value;
  ticket.estimated = this.form.estimated.value;
  ticket.deadline = this.form.deadline.value;
  ticket.percentReady = this.form.percent.value;
  ticket.priority = this.form.priority.value;
  ticket.status = this.form.status.value;

  saveObject(ticket);
  addTicketItem(ticket);
  document.querySelector('.list-tickets').style.display="block";
  document.querySelector('.new-ticket').style.display="none";
}

function addCommentItem(comment){
  var div = document.createElement('div');
  var commentUser = document.createElement('h3');
  var commentText = document.createElement('div');
  div.appendChild(commentUser);
  div.appendChild(commentText);
  div.className = "comment";
  commentUser.innerHTML = comment.userId;
  commentText.innerHTML = comment.text;
  document.getElementsByClassName('comments')[1].appendChild(div);
}

function openCreateCommentForm(){
  document.querySelector('.new-comment').style.display="block";
  openCreateComment.style.display="none";
}

function createNewComment(){
  var comment = new Comment("com_n");
  comment.userId = activeUser.id;
  comment.ticketId = document.querySelector(".detail-ticket h2 span").innerHTML;
//  var ticket = getObject(comment.ticketId);
//  ticket.commentId.push(comment.id);
//  saveObject(ticket);

  comment.text = this.form.comment.value;
  this.form.comment.value="";
  saveObject(comment);
  addCommentItem(comment);
  document.querySelector('.new-comment').style.display="none";
  openCreateComment.style.display="block";
}
function openEditTicketForm(){
  document.querySelector(".detail-ticket").style.display = "none";
  document.querySelector(".edit-ticket").style.display = "block";
  if (activeUser.role !== roles[0]) {
    document.querySelector(".estimated").style.display = "none";
    document.querySelector(".deadline").style.display = "none";
    selectExecutor.style.display = "none";
  }
}

function saveEditTicket() {
  var ticketId = document.querySelector(".detail-ticket h2 span").innerHTML;
  var ticket = getObject(ticketId);

  ticket.estimated = this.form.estimated.value;
  ticket.deadline = this.form.deadline.value;
  ticket.percentReady = this.form.percent.value;
  ticket.status = this.form.status.value;
  saveObject(ticket);
  document.querySelector(".list-tickets").style.display = "block";
  document.querySelector(".edit-ticket").style.display = "none";
}
