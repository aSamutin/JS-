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
