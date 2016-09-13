var View = require('../view');
// var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var _ = require('lodash');
var $ = require('jquery/dist/jquery');
var template = require('./reg-executor.ejs');

var flagAddExecutor;

var ExecutorRegView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    location.hash = 'reg-executor';
};

inherit(ExecutorRegView, View);

ExecutorRegView.prototype.render = function () {
    flagAddExecutor = false;
    //this.el.html(this.template());
    this.popup.addClass('on');
    this.popup.html(this.template());
};
ExecutorRegView.prototype.createEvents = function () {
    this.popup.on('click', '#addExecutor', this.addExecutor);
    this.popup.on('click', '.close', this.closePopup);
};
ExecutorRegView.prototype.closePopup = function(){
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');
    window.history.go(-1);
};
ExecutorRegView.prototype.addExecutor = function(){
    if (!flagAddExecutor){
        var newUser = {
            id: this.form.newExecutor.value,
            login: this.form.newExecutor.value,
            ticketsId: [''],
            role: 'Executor'
        };
        request.saveUser(newUser);
        flagAddExecutor = true;
    }
    // router.navigate('task-list');
    // location.hash = 'task-list';
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');
    window.history.go(-1);
};

ExecutorRegView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function(data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            return data;
        });
    }
    return this.promise;
};

module.exports = ExecutorRegView;
