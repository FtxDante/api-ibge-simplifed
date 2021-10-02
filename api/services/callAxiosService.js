const axios = require('axios')
async function callAxios(){
    const {data} = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
    return data;
}

module.exports = callAxios;