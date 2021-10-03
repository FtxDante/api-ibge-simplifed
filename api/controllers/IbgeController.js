const callAxios = require('../services/callAxiosService')
const UfLowCase = require('../errors/UfLowCase')
const UfLengthError = require('../errors/UfLengthError')
let dataApiIbge;
callAxios().then(apiAnswer =>{
    dataApiIbge = apiAnswer;
    console.log('IBGE API ready to use')
})
class IbgeController{

    _allCities;

    async cleanData(){
        try{
            const dataCleaned = await dataApiIbge.map(city => {
                const dataCorrect = {
                    id: city.id,
                    name: city.nome,
                    state: city.microrregiao.mesorregiao.UF.nome,
                    uf: city.microrregiao.mesorregiao.UF.sigla,
                    region: city.microrregiao.mesorregiao.UF.regiao.nome
                }    
                return dataCorrect;
            });
            this.allCities = dataCleaned
        }catch(error){
            throw new Error('API DONT READY! AWAIT FEW SECONDS')  
        }
    }

    async searchCityByUf(queries){
        const {uf} = queries;
        await this.findErrorUf(uf)
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            if(city.uf == uf){
                return city;
            }
        })
        return citiesFound;
    } 

    async searchCityByName(queries){
        const {name} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            const cityNameLowCase = (city.name.toLowerCase());
            const nameReceveid = name.toLowerCase();
            if(cityNameLowCase.includes(nameReceveid)){
                return city;
            }
        })
        return citiesFound;
    }

    async searchCityByRegion(queries){
        const {region} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            const cityRegionLowCase = (city.region.toLowerCase()).replace('-', ' ');;
            const regionReceveid = region.toLowerCase().replace('-', ' ');
            if(cityRegionLowCase.includes(regionReceveid)){
                return city;
            }
        })
        return citiesFound;
    }

    async searchCityByState(queries){
        const {state} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            const cityStateLowCase = (city.state.toLowerCase());
            const stateReceveid = state.toLowerCase();
            if(cityStateLowCase.includes(stateReceveid)){
                return city;
            }
        })
        return citiesFound;
    }

    async searchAllCities(){
        await this.cleanData();
        return this.allCities;
    }

    async findErrorUf(uf){
        if(uf.toUpperCase() !== uf){
            throw new UfLowCase()
        } 
        if(uf.length !== 2){
            throw new UfLengthError()
        }
    } 

    get allCities(){
        return this._allCities;
    }

    set allCities(data){
        this._allCities = data;
    }

}
module.exports = new IbgeController();

