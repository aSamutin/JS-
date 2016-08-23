var config = require('../../app.config');

/**
 * Constructor for View class.
 */
function View () {
    this.el = config.appElement;
    this.createEvents();
}

/**
 * Define actions required on destroy.
 */
View.prototype.close = function () {
    // Do nothing.
};

/**
 * Define fetch method.
 */
View.prototype.fetchData = function () {
    return {
        // Emulate async.
        then: function (callback) {
            callback();
        }
    };
};

/**
 * Define dummy render method.
 */
View.prototype.render = function () {
    this.el.html('BOO!');
};


/**
 * Create events handlers.
 * Needs to remove them on close.
 */
View.prototype.createEvents = function () {
    // Do nothing.
};

module.exports = View;
