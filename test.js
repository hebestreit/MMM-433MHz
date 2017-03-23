var signals = require("./signals.js");

var Callback = function () {
    this.onStart = function () {
    };

    this.onReceive = function (data) {
        console.log(data);
    };

    this.onExit = function () {
    };
};

signals.receive(new Callback());

// signals.send(123, function (data) {
//     console.log(data)
// });