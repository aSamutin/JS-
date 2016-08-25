var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var $ = require('jquery/dist/jquery');
var _ = require('lodash');
var template = require('./task-edit.ejs');

var ticket;
var users;
var flagSaveEdit = false;

var TaskEditView = function (tick) {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.ticket = tick;
    location.hash = 'task-edit';
};

inherit(TaskEditView, View);

TaskEditView.prototype.render = function () {
    var data = this.getRenderData();
    this.el.html(this.template(data));
    if (config.user.role != 'Admin') {
        $('.estimated').hide();
        $('.deadline').hide();
    }
};

TaskEditView.prototype.createEvents = function () {
    flagSaveEdit = true;
    this.el.on('click', '#saveEdit', this.saveEdit);

};
TaskEditView.prototype.saveEdit = function(){
    if (flagSaveEdit) {
        ticket.estimated = this.form.estimated.value;
        ticket.deadline = this.form.deadline.value;
        ticket.percentReady = this.form.percent.value;
        ticket.status = this.form.status.value; alert(ticket.executorId);
        ticket.executorId = (_.find(users, {'login': ticket.executorId}));
        ticket.clientId = (_.find(users, {'login': ticket.clientId}));
        ticket.clientId = ticket.clientId.id;
        if (!ticket.executorId){
            ticket.executorId = 'Не назначен';
        } else {
            ticket.executorId = ticket.executorId.id;
        }
        request.editTicket(ticket);
        config.user.ticketsId = config.user.ticketsId;
        flagSaveEdit = false;
        router.navigate('task-list');
    }
};

TaskEditView.prototype.getRenderData = function () {
    ticket.deadline = (ticket.deadline).slice(0,10);
    return {ticket: this.ticket};
};

TaskEditView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function (data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            users = data;
            return data;
        });
        ticket = this.ticket;
    }
    return this.promise;
};

module.exports = TaskEditView;
