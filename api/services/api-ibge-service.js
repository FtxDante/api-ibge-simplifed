const axios = require('axios');

class ApiIbge{
    static cities;

    static async callAxios(url){
        console.log('Entrei no axios')
        const {data} = await axios(`https://servicodados.ibge.gov.br/api/v1/localidades${url}`);
        const tratedData = data.map(county =>{
            const newData = {
                id: county.id,
                name: county.nome,
                state: county.microrregiao.mesorregiao.UF.nome,
                uf: county.microrregiao.mesorregiao.UF.sigla,
                region: county.microrregiao.mesorregiao.UF.regiao.nome
            }
            return newData;
        })
        ApiIbge.cities = tratedData;
        console.log('Saí do axios')
    }
}

/* {
  id: 1100023,
  nome: 'Ariquemes',
  microrregiao: {
    id: 11003,
    nome: 'Ariquemes',
    mesorregiao: { id: 1102, nome: 'Leste Rondoniense', UF: [Object] }
  },
  'regiao-imediata': {
    id: 110002,
    nome: 'Ariquemes',
    'regiao-intermediaria': { id: 1101, nome: 'Porto Velho', UF: [Object] }
  }
} */
module.exports = ApiIbge;