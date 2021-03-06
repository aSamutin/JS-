var View = require('../view');
var config = require('../../app.config');
// var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var $ = require('jquery/dist/jquery');
var _ = require('lodash');
var template = require('./task-create.ejs');

var users = [];
var flagCreateTicket;

var TaskCreateView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.userList = [];
    location.hash = 'task-create';
};

inherit(TaskCreateView, View);


TaskCreateView.prototype.render = function () {
    var data = this.getRenderData();
    this.popup.addClass('on');
    this.popup.html(this.template(data));
    $('input[name = "deadline"]').val((new Date().toISOString()).slice(0, 10));
    flagCreateTicket = false;
};

TaskCreateView.prototype.createEvents = function () {
    this.popup.on('click', '#addTicket', this.addTicket);
    this.popup.on('click', '.close', this.closePopup);
};

TaskCreateView.prototype.closePopup = function(){
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');
    window.history.go(-1);
};

TaskCreateView.prototype.addTicket = function(){
    if(!flagCreateTicket){
        var client =(_.filter(users, {'login': this.form.client.value}))[0];
        var admin =(_.filter(users, {'role': 'Admin'}))[0];
        var newTicket = {
            id : Math.round((Math.random()*10000)),
            executorId: 'Не назначен',
            clientId: client.id,
            description: this.form.details.value,
            estimated: this.form.estimated.value,
            deadline: this.form.deadline.value,
            percentReady: this.form.percent.value,
            priority: this.form.priority.value,
            status: this.form.status.value,
            commentId : ['']
        };
        config.user.ticketsId.push(newTicket.id);
        admin.ticketsId.push(newTicket.id);
        client.ticketsId.push(newTicket.id);
        request.editUser(admin);
        request.editUser(client);
        request.saveTicket(newTicket);
        flagCreateTicket = true;
    }
    // router.navigate('task-list');
    // location.hash = 'task-list';
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');

    window.history.go(-1);
};


TaskCreateView.prototype.getRenderData = function () {
    return {usersList: this.userList};
};

TaskCreateView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function(data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            users = data;
        });
    }
    return this.promise;
};

TaskCreateView.prototype.close = function () {
    this.el.off('submit', 'form');
};

module.exports = TaskCreateView;
