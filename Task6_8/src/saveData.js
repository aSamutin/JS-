'use strict'

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = " none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "application/json"}),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


export {saveData};
