function foundUser(){
  var user = document.getElementsByName('username')[0];
  var activeUser = getObject(user.value);
    if(activeUser.login) { //Если правильный логин
      document.getElementsByClassName('list-tickets')[0].style.display="block";
      document.getElementsByClassName('autorization')[0].style.display="none";
      if (activeUser.role == roles[2]) {    //Скрываем кнопку для всех исполнителей
        document.getElementById("create-ticket").style.display = "none";
      }

      if (activeUser.ticketsId.length) { //Если заявки есть то
        var table = document.querySelector("table");
        var tr = document.createElement('tr');
        var td = [];

        for (var i = 0; i < 8; i++) {
          td.push(document.createElement('td'));
          tr.appendChild(td[i]);
        }

        for (i = 0; i < activeUser.ticketsId.length; i++) {
          var ticketLine = getObject(activeUser.ticketsId[i]);
          td[0].innerHTML = ticketLine.clientId;
          td[1].innerHTML = ticketLine.executorId;
          td[2].innerHTML = ticketLine.description;
          td[3].innerHTML = ticketLine.priority;
          td[4].innerHTML = ticketLine.estimated;
          td[5].innerHTML = ticketLine.deadline;
          td[6].innerHTML = ticketLine.percentReady;
          td[7].innerHTML = ticketLine.commentId;
          td[7].style.display = "none";
          var newTr = tr.cloneNode(true);
          newTr.addEventListener('click', openDetail); //каждой строке назначаем обработчика событий
          table.appendChild(newTr);
        }
      } else { //иначе вывести сообщение
        var listTickets = document.querySelector(".list-tickets");
        var div = document.createElement('div');
        div.innerHTML = "Нет заявок";
        div.className = "message";
        listTickets.appendChild(div);
      }

    }
}
function openDetail(){
  document.getElementsByClassName('list-tickets')[0].style.display="none";
  document.getElementsByClassName('detail-ticket')[0].style.display="block";
  var tableDetail =  document.querySelectorAll("table")[1];
  event.currentTarget.children[7].style.display = 'block'; // id комментариев
  var newTr = event.currentTarget.cloneNode(true);

  tableDetail.appendChild(newTr);
}
entry.addEventListener('click', foundUser);
