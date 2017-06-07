var signals = require("./signals.js");

// var Callback = function () {
//     this.onStart = function () {
//     };
//
//     this.onReceive = function (data) {
//         console.log(data);
//     };
//
//     this.onExit = function () {
//     };
// };
//
// signals.receive(new Callback());

signals.send(5393, function (data) {
    console.log(data)
});


/**
 * CH   ON      OFF
 * -----------------
 * A    1361    1364
 * B    4433    4436
 * C    5201    5204
 * D    5393    5396
 */
