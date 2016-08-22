var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var template = require('./reg-executor.ejs');

var flagAddExecutor;

var ExecutorRegView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
};

inherit(ExecutorRegView, View);

ExecutorRegView.prototype.render = function () {
    flagAddExecutor = false;
    this.el.html(this.template());
};
ExecutorRegView.prototype.createEvents = function () {
    this.el.on('click', '#addExecutor', this.addExecutor);
};
ExecutorRegView.prototype.addExecutor = function(){
    if (!flagAddExecutor){
        var newUser = {
            id: this.form.newExecutor.value,
            login: this.form.newExecutor.value,
            ticketsId: [""],
            role: "Executor"
        };
        request.saveUser(newUser);
        flagAddExecutor = true;
    }
    router.navigate('task-list');
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
