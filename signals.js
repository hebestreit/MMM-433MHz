var utilsPath = 'cd ' + __dirname + '/433Utils/RPi_utils/ && ./';

var signals = function () {
};
signals.prototype.spawn = require('child_process').spawn;
signals.prototype.recv_process = null;
signals.prototype.recv_callback = null;
signals.prototype.recv_RegExp = new RegExp("^Received ([0-9,]+)");

signals.prototype.exec = require('child_process').exec;
signals.prototype.send_process = null;

/**
 * Receive signal codes
 * @todo get this feature working
 * @param callback
 */
signals.prototype.receive = function (callback) {
    var self = this;

    this.recv_callback = callback;
    // start a process to receive signals
    this.recv_process = this.spawn(utilsPath + 'RFSniffer');
    this.recv_process.stdout.on('data', function (data) {
        // retrieved output from C++ process
        var lines = data.toString('utf8').split(/\r\n|\r|\n/);
        for (var line in lines) {
            var code = self.recv_RegExp.exec(lines[line]);

            if ((code !== null) && (code.length === 2)) {
                self.recv_callback.onReceive(code[1]);
            }
        }
    });

    this.recv_process.on('exit', function () {
        self.recv_callback.onExit();
    });

    self.recv_callback.onStart();
};

/**
 * Send code
 * @param {int} code
 * @param callback
 */
signals.prototype.send = function (code, callback) {
    this.send_process = this.exec(utilsPath + 'codesend ' + code, function (e, stdout, stderr) {
        callback(stdout);
    });
};

module.exports = new signals();