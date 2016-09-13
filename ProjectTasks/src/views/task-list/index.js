var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var $ = require('jquery/dist/jquery');
var _ = require('lodash');
var template = require('./task-list.ejs');

var users = [];
var usersList = [];
var tickets = [];

var TaskListView = function (keySort) {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.taskList = [];
    this.userList = [];
    this.keySort = keySort;
    location.hash = 'task-list';
};

inherit(TaskListView, View);

TaskListView.prototype.render = function () {
    history.pushState({}, 'Список заявок', '/#task-list');
    var data = this.getRenderData();
    this.el.html(this.template(data));
    switch (config.user.role) {
    case 'Executor':
        $('#openCreateTicket').hide();
        $('#openCreateExecutor').hide();
        break;
    case 'Client':
        $('#openCreateExecutor').hide();
        break;
    default:
    }
};

TaskListView.prototype.createEvents = function () {
    this.el.on('click', 'tr.line', this.openTask);
    this.el.on('click', '#openCreateTicket', this.openCreateTask);
    this.el.on('click', '#openCreateExecutor', this.openExecutorReg);
    this.el.on('click', '.headSort th', this.sort);
    this.el.on('click', '#filter', this.filter);
    this.el.on('click', '#find', this.find);
    this.el.on('click', '#exit', this.exit);
};

TaskListView.prototype.sort = function(){
    var hTable = {
        'Номер заявки': 'id',
        'Клиент': 'clientId',
        'Исполнитель': 'executorId',
        'Описание': 'description',
        'Приоритет': 'priority',
        'Estimated': 'estimated',
        'Deadline': 'deadline',
        'Готовность(%)': 'percentReady',
        'Статус': 'status',
    };
    var key = hTable[this.innerHTML];
    config.keySortTicket = key;
    router.navigate('task-list', key);
    // location.hash = 'task-list';
};

TaskListView.prototype.exit = function(){
    location.hash = 'auth';
};

TaskListView.prototype.filter = function(){
    var filterTickets;
    if ((this.form.client.value == 'All') && (this.form.status.value == 'All')){
        filterTickets = tickets;
    } else if (this.form.client.value == 'All') {
        filterTickets = _.filter(tickets, {status:this.form.status.value});
    } else if (this.form.status.value == 'All') {
        filterTickets = _.filter(tickets, {clientId:this.form.client.value});
    } else {
        filterTickets = _.filter(tickets, {clientId:this.form.client.value, status:this.form.status.value});
    }

    $('#app').html(template({list:filterTickets, usersList:users, user: config.user.login}));
    $('select[name="client"]').val(this.form.client.value);
    $('select[name="status"]').val(this.form.status.value);

    switch (config.user.role) {
    case 'Executor':
        $('#openCreateTicket').hide();
        $('#openCreateExecutor').hide();
        break;
    case 'Client':
        $('#openCreateExecutor').hide();
        break;
    default:
    }
};

TaskListView.prototype.find = function(){
    var searchTicket=[];
    searchTicket[0] = _.find(tickets, {id: +this.form.search.value});

    if (!searchTicket[0]){
        searchTicket = [];
    }
    $('#app').html(template({list:searchTicket, usersList:users, user: config.user.login}));

    switch (config.user.role) {
    case 'Executor':
        $('#openCreateTicket').hide();
        $('#openCreateExecutor').hide();
        break;
    case 'Client':
        $('#openCreateExecutor').hide();
        break;
    default:
    }
};

TaskListView.prototype.openExecutorReg = function(){
    // router.navigate('reg-executor');
    location.hash = 'reg-executor';
};

TaskListView.prototype.openCreateTask = function(){
    // router.navigate('task-create');
    location.hash = 'task-create';
};

TaskListView.prototype.openTask = function (event) {
    var target = event.currentTarget;
    var comm = target.dataset.comments.split(',');

    for (var i = 0; i < comm.length; i++) {
        comm[i] =+ comm[i];
    }
    var ticket = {
        id: +target.dataset.id ,
        commentsId: comm,
        users: usersList
    };
    config.ticket = ticket;
    // router.navigate('task', ticket);
    location.hash = 'task';
};

TaskListView.prototype.close = function () {
    this.el.off('click', 'tr');
    this.el.off('click', '#openCreateTicket');
    this.el.off('click', '#openCreateExecutor');
};

TaskListView.prototype.getRenderData = function () {
    tickets = this.taskList;
    for (var i = 0; i < tickets.length; i++) {
        tickets[i].deadline = (tickets[i].deadline).slice(0,10);
        tickets[i].executorId = (_.find(usersList, {'id': +tickets[i].executorId}));

        if (!tickets[i].executorId){
            tickets[i].executorId = 'Не назначен';
        } else {
            tickets[i].executorId = tickets[i].executorId.login;
        }
        tickets[i].clientId = (_.find(usersList, {'id': +tickets[i].clientId})).login;

    }
    return {
        list: tickets,
        usersList: this.userList,
        user: config.user.login

    };
};

TaskListView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        request.getUsersList().then(function(data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            users = self.userList;
            usersList = data;
        });

        this.promise = request.getTicketsList(config.user.ticketsId).then(function (data) {
            self.taskList = _.sortBy( data, function(ticket){ return ticket[self.keySort]; });
            tickets = self.taskList;
            return data;
        });
    }
    return this.promise;
};

module.exports = TaskListView;
