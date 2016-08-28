var View = require('../view');
var config = require('../../app.config');
// var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var $ = require('jquery/dist/jquery');
var template = require('./authorization.ejs');

var AuthView = function () {
    this.super.constructor.apply(this);
    config.user = null;
    this.template = template();
    location.hash = 'auth';
};

inherit(AuthView, View);

AuthView.prototype.render = function () {
    this.el.html(this.template);
};

AuthView.prototype.createEvents = function () {
    this.el.on('click', '#entry', this.getUser);
    this.el.on('click', '#openRegistration', this.openClientReg);
};

AuthView.prototype.openClientReg = function() {
    // router.navigate('reg-client');
    location.hash = 'reg-client';
};

AuthView.prototype.getUser = function (event) {
    event.preventDefault();
    var username = $('input[name = "username"]').val();
    request.getUser(username).then( function(user) {
        var activeUser = user[0];
        if (activeUser){
            config.user = activeUser;
            request.activeUser(activeUser);
            //  router.navigate('task-list');
            location.hash = 'task-list';
        } else if(username == 'Admin') {
            var newUser = {
                id: 1,
                login: 'Admin',
                ticketsId: [''],
                role: 'Admin'
            };
            config.user = newUser;
            request.saveUser(newUser);
            request.activeUser(activeUser);
            //  router.navigate('task-list');
            location.hash = 'task-list';
        } else {
            alert('Пользователь не найден');
        }
    });
};

AuthView.prototype.close = function () {
    this.el.off('submit', 'form');
};

module.exports = AuthView;
