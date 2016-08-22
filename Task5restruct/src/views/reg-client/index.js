var View = require('../view');
var config = require('../../app.config');
var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var template = require('./reg-client.ejs');

var flagAddClient;

var ClientRegView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
};

inherit(ClientRegView, View);

ClientRegView.prototype.render = function () {
    flagAddClient = false;
    this.el.html(this.template());
};

ClientRegView.prototype.createEvents = function () {
    this.el.on('click', '#addClient', this.addClient);
};
ClientRegView.prototype.addClient = function(){
    if (!flagAddClient){
        var newUser = {
            id: this.form.newClient.value,
            login: this.form.newClient.value,
            ticketsId: [""],
            role: "Client"
        };
        request.saveUser(newUser);
        flagAddClient =true;
    }
    router.navigate('auth');
};

ClientRegView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function(data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            return data;
        });
    }
    return this.promise;
};

module.exports = ClientRegView;
