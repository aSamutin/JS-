var config = require('./app.config');

var views = {};
var Router = {};

Router.navigate = function (path, params) {
    if (config.currentPage.close) {
        config.currentPage.close();
    }
    var view = views[path];
    config.currentPage = new view(params);
    config.currentPage.fetchData().then(function() {
        config.currentPage.render();
    });
};

Router.addView = function (path, func, defaultRoute) {
    views[path] = func;
    if (defaultRoute) {
        this.navigate(path);
    }
};

window.addEventListener('hashchange', function(){
    var Hash = location.hash;
    var path = (Hash).substring(1);
    if ((path === 'task')||(path === 'task-edit')||(path === 'sel-executor')) {
        Router.navigate(path, config.ticket);
    } else if ((path === 'task-list')&&(config.keySortTicket != null)) {
        Router.navigate(path, config.keySortTicket);
        config.keySortTicket = null;
    } else {
        Router.navigate(path);
    }
});

module.exports = Router;
