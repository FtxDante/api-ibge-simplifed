const cityRoute = require('./cityRoute');
const express = require('express');

module.exports = app =>{
    app.use(express.json(), cityRoute);
}