const express = require('express');

require('dotenv').config();

const cluster = require('cluster');
const cCPUs = require('os').cpus().length;

const helloWorld = require('./routes/hello_world/hello_world');
const proxy = require('./routes/proxy/simple_proxy');

if (cluster.isMaster) {
    for (let i = 0; i < cCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online.');
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died.');
    });
} else {
    const app = express();

    app.use(express.json());

    app.use(helloWorld);
    app.use(proxy);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
