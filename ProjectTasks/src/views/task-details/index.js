var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var $ = require('jquery/dist/jquery');
var _ = require('lodash');
var template = require('./task-details.ejs');
var templateComment = require('./create-comment.ejs');
var commentItem =require('./comment.ejs');

var ticket;
var usersList;
var flagOCC = false;
var flagAC = false;

var TaskView = function (ticket) {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.task_id = +ticket.id;
    this.task_id_comm = ticket.commentsId;
    this.usersList = ticket.users;
    this.taskData = null;
    this.taskComments = [];
};

inherit(TaskView, View);

TaskView.prototype.createEvents = function () {
    this.el.on('click', '#openEditTicket', this.openEditTask);
    this.el.on('click', '#openSelectExecutor', this.openSelectExecutor);
    this.el.on('click', '#openCreateComment', this.openCreateComment);
    this.el.on('click', '#addComment', this.addComment);
};

TaskView.prototype.openEditTask = function(){
    router.navigate('task-edit', ticket);
};

TaskView.prototype.openSelectExecutor = function(){
    router.navigate('sel-executor', ticket);
};

TaskView.prototype.openCreateComment = function(){
    if (!flagOCC){
        $('#openCreateComment').hide();
        $('.comments').append(templateComment());
        flagOCC = true;
        flagAC = false;
    }
};
TaskView.prototype.addComment = function(){
    flagOCC = false;
    if (!flagAC){
        var comment = {
            id: Math.random(),
            userId: config.user.id,
            ticketId: ticket.id,
            text: this.form.comment.value
        };
        request.saveComment(comment);
        comment.userId = (_.find(usersList, {'id': +comment.userId})).login;
        $('.new-comment').hide();
        $('.comments').append(commentItem({comment: comment}));
        $('#openCreateComment').fadeIn();
        ticket.commentId.push(comment.id);

        if (!(+ticket.clientId)){
            ticket.clientId = (_.find(usersList, {'login': ticket.clientId})).id;
        }
        request.editTicket(ticket);
        flagAC = true;
    }
};

TaskView.prototype.render = function (){
    var data = this.getRenderData();
    this.el.html(this.template(data));

    if (config.user.role != 'Admin'){
        $('#openSelectExecutor').hide();
    } else if (data.ticket.executorId != 'Не назначен'){
        $('#openSelectExecutor').hide();
    }
};

TaskView.prototype.getRenderData = function() {
    ticket.executorId = (_.find(usersList, {'id': +ticket.executorId}));
    ticket.deadline = (ticket.deadline).slice(0,10);

    if (!ticket.executorId){
        ticket.executorId = 'Не назначен';
    } else {
        ticket.executorId= ticket.executorId.login;
    }

    ticket.clientId = (_.find(usersList, {'id': +ticket.clientId})).login;

    for (var i = 0; i < this.taskComments.length; i++){
        this.taskComments[i].userId = (_.find(usersList, {'id': +this.taskComments[i].userId})).login;
    }
    return {
        ticket: ticket,
        comment: this.taskComments
    };
};

TaskView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        request.getComments(self.task_id_comm).then(function(data){
            self.taskComments = data;
        });

        this.promise = request.getTicket(self.task_id).then(function(data) {
            self.taskData = data[0];
            ticket = data[0];
            return data;
        });

        usersList = this.usersList;
      //  tickId = this.task_id;
    }
    return this.promise;
};

module.exports = TaskView;
