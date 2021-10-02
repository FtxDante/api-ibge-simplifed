const express = require('express');
const app = express();
const routes = require('./routes');

routes(app);
app.listen(3000, () =>{
    console.log('The server is running at port 3000, please await API IBGE');  
})


