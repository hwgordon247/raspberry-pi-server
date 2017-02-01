var express = require('express')
var app = express()
var port = 3000
var sys = require('sys')
var exec = require('child_process').exec;
var child;

app.get('/yo', (request, response) => {
    child = exec("pwd", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    response.send('Hello from Express!')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
