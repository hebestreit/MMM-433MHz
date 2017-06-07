Module.register("MMM-433MHz", {
    requiresVersion: "2.1.0",

    // Default module config.
    defaults: {
        receiver: false
    },

    /**
     * Define start sequence.
     */
    start: function () {
        Log.info("Starting module: " + this.name);

        this.sendSocketNotification("433MHz_CONFIG", {
            config: this.config
        });
    },

    /**
     * Send code
     * @param code
     */
    send: function (code) {
        Log.info("433MHz send code: " + code);
        this.sendSocketNotification("433MHz_SEND", {code: code});
    },

    /**
     * Received notifcation from other module
     * @param notification
     * @param payload
     * @param sender
     */
    notificationReceived: function (notification, payload, sender) {
        if (notification === "433MHz_SEND") {
            this.send(payload);
        }
    },

    /**
     * Received socket notification and dispatch notification to other modules
     * @param notification
     * @param payload
     */
    socketNotificationReceived: function (notification, payload) {
        if (notification === "433MHz_RECEIVED") {
            Log.info("433MHz received code: " + payload);
            this.sendNotification("433MHz_RECEIVED", payload);
        } else if (notification === "433MHz_SENT") {
            this.sendNotification("433MHz_SENT", payload);
        }
    }
});