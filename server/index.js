'use strict'

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const publicFolder = path.resolve(__dirname, '..', 'src');

app.use(morgan('dev'));
app.use(express.static(publicFolder));

const port = process.env.PORT || 8002;

app.all('/*', (req, res) => {
    res.sendFile(path.resolve('${publicFolder}/index.html'));
})

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
