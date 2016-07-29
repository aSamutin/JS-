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

module.exports = Router;
