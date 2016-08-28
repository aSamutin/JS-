require('../style/style.css');
var router = require('./app.router');


var AuthView = require('./views/authorization');
var TaskListView = require('./views/task-list');
var TaskView = require('./views/task-details');
var TaskCreateView = require('./views/task-create');
var ExecutorRegView = require('./views/reg-executor');
var ClientRegView = require('./views/reg-client');
var TaskEditView = require('./views/task-edit');
var ExecutorSelView = require('./views/sel-executor');

router.addView('auth', AuthView, true);
router.addView('task-list', TaskListView);
router.addView('task', TaskView);
router.addView('task-create', TaskCreateView);
router.addView('reg-executor', ExecutorRegView);
router.addView('reg-client', ClientRegView);
router.addView('task-edit', TaskEditView);
router.addView('sel-executor', ExecutorSelView);