const express = require('express');
const winston = require('winston');

const router = express.Router();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'proxy' },
    transports: [
        new  winston.transports.File({
            filename: 'proxy.log',
        }),
    ]
})

router.use((req, res) => {
    const today = new Date();
    const YYYY = today.getFullYear();
    const MM = String(today.getMonth() + 1).padStart(2, '0');
    const DD = String(today.getDate()).padStart(2, '0');
    const hh = today.getHours();
    const mm = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    logger.info("[" + YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ":" + ss + '] ' +
        req.socket.remoteAddress + " " + req.method + " " + req.path);
    return res.status(200).send(req.path);
});

module.exports = router;