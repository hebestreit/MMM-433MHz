var signals = require("./signals.js");

var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
    /**
     * Method called when module has been started
     */
    start: function () {
        var self = this;

        console.log("Starting node helper for: " + self.name);

        this.loaded = false;
    },
    /**
     * Received socket notification
     * @param notification
     * @param payload
     */
    socketNotificationReceived: function (notification, payload) {
        var self = this;
        if (notification === '433MHz_CONFIG') {
            this.config = payload.config;

            if (this.config.receiver) {
                this.initializeReceiver();
            }
        }

        if (notification === '433MHz_SEND') {
            signals.send(payload.code, function () {
                self.sendSocketNotification('433MHz_SENT', {code: payload.code});
            });
        }
    },
    /**
     * Initialize 433 MHz receiver and send socket notification
     */
    initializeReceiver: function () {
        if (this.loaded) {
            return;
        }

        var self = this;
        var Callback = function () {
            this.onStart = function () {
                self.loaded = true;
            };

            this.onReceive = function (data) {
                self.sendSocketNotification('433MHz_RECEIVED', {code: data});
            };

            this.onExit = function () {
            };
        };

        signals.receive(new Callback());
    }
});