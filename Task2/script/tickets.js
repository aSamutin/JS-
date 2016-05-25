openCreateTicket.addEventListener('click', openCreateTicketForm);
addTicket.addEventListener('click',createNewTicket);
openEditTicket.addEventListener('click', openEditTicketForm);
saveEdit.addEventListener('click', saveEditTicket);
openSelectExecutor.addEventListener('click', openSelectExecutorForm);
selectExecutor.addEventListener('click', selectThisExecutor);

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
