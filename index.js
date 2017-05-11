var express = require('express')
var app = express()
var port = 3000
var sys = require('sys')
var exec = require('child_process').exec;
var child;

app.get('/restart', function(request, response) {
    child = exec("sudo reboot", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    response.send('Restarting!')
});

app.get('/shutdown', function(request, response) {
    child = exec("sudo shutdown -h now", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    response.send('Shutting down!')
});

app.get('/test', ensureAuthenticated, function(request, response) {
    response.send(true);
});

function ensureAuthenticated(req, res, next) {
    console.log(req.headers);
    next();
};

app.listen(port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on ' + port)
});
