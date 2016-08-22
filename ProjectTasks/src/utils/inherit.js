module.exports = function (Child, Parent) {
    var obj = function () {};
    obj.prototype = Parent.prototype;

    Child.prototype = new obj();
    Child.prototype.constructor = Child;
    Child.prototype.super = Parent.prototype;
};
