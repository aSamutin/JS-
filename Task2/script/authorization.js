entry.addEventListener('click', authorization);

function authorization() {
  var user = document.querySelector("input[name = 'username']");
  var activeUser = getObject(user.value);

  if(activeUser.login) {
    switch (activeUser.role) {
      case roles[2]:
        openCreateTicket.style.display = "none";
        openCreateExecutor.style.display = "none";
        openSelectExecutor.style.display ="none";
        document.querySelector(".estimated").style.display = "none";
        document.querySelector(".deadline").style.display = "none";
        selectExecutor.style.display = "none";
      break;
      case roles[1]:
        openCreateExecutor.style.display = "none";
        openEditTicket.style.display ="none";
        openSelectExecutor.style.display ="none";
        document.querySelector(".estimated").style.display = "none";
        document.querySelector(".deadline").style.display = "none";
        selectExecutor.style.display = "none";
      break;
      default:
    }

    update();

    document.querySelector('.authorization').style.display = "none";
    document.querySelector('.list-tickets').style.display = "block";
  }
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
