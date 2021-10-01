const express = require('express');
const app = express();
const ApiIbge = require('./services/api-ibge-service');
const apiIbge = new ApiIbge();


app.listen(3000, async () =>{
    console.log('The server is running at port 3000');
    await ApiIbge.callAxios('/municipios')
    console.log(ApiIbge.cities);   
})
