openCreateExecutor.addEventListener('click',openCreateExecutorForm);
addExecutor.addEventListener('click',createNewExecutor);
openRegistration.addEventListener('click', openRegistrationForm);
addClient.addEventListener('click', createNewClient);

function openCreateExecutorForm(){
  document.querySelector(".list-tickets").style.display ="none";
  document.querySelector(".registration-executor").style.display = "block";
}

function createNewExecutor(){ //Создание нового исполнителя
  var newUser = new User(document.forms[6].newExecutor.value);
  var usersList = getObject("usersList");
  newUser.role = roles[2];
  usersList.push(newUser.id);
  saveObject(newUser);
  saveUser(usersList);
  update();
  document.querySelector(".registration-executor").style.display = "none";
  document.querySelector(".list-tickets").style.display ="block";
}

function openRegistrationForm(){
  document.querySelector(".authorization").style.display = "none";
  document.querySelector(".registration").style.display = "block";
}

function createNewClient(){ //Регистрация нового клиента
  var newUser = new User(document.forms[5].newClient.value);
  var usersList = getObject("usersList");
  newUser.role = roles[1];
  usersList.push(newUser.id);
  saveObject(newUser);
  saveUser(usersList);
  document.querySelector(".registration").style.display = "none";
  document.querySelector(".authorization").style.display ="block";
}
