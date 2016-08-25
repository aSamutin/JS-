var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var _ = require('lodash');
var template = require('./sel-executor.ejs');

var users = [];
var ticket;

var ExecutorSelView = function (tick) {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.userList = [];
    this.ticket = tick;
    location.hash = 'sel-executor';
};

inherit(ExecutorSelView, View);

ExecutorSelView.prototype.render = function () {
    var data = this.getRenderData();
    this.el.html(this.template(data));
};

ExecutorSelView.prototype.createEvents = function () {
    this.el.on('click', '#selectExecutor', this.selectExecutor);

};
ExecutorSelView.prototype.selectExecutor = function(){
    var executor =(_.find(users, {'login':this.form.executors.value}));
    if (!(+ticket.clientId)){
        ticket.clientId = (_.find(users, {'login': ticket.clientId})).id;
    }
    ticket.executorId = executor.id;
    executor.ticketsId.push(ticket.id);
    request.editUser(executor);
    request.editTicket(ticket);
    config.user.ticketId = config.user.ticketId;
    router.navigate('task-list');
};

ExecutorSelView.prototype.getRenderData = function () {
    return {usersList: this.userList};
};

ExecutorSelView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function(data) {
            self.userList = _.map(_.filter(data, {'role':'Executor'}), 'login');
            users = data;
            return data;
        });
        ticket = this.ticket;
    }
    return this.promise;
};

module.exports = ExecutorSelView;
