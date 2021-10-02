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

    async searchCityForUf(queries){
        const {uf} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            let dataAsked;
            if(city.uf == uf){
                dataAsked = city;
            }
            return dataAsked;
        })
        await this.findErrorUf(uf)
        return citiesFound;
    } 

    async searchForCityName(queries){
        const {name} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            let dataAsked;
            const cityNameLowCase = (city.name.toLowerCase());
            const nameReceveid = name.toLowerCase();
            if(cityNameLowCase == nameReceveid){
                dataAsked = city;
            }
            return dataAsked;
        })
        return citiesFound;
    }

    async searchForCityRegion(queries){
        const {region} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            let dataAsked;
            const cityRegionLowCase = (city.region.toLowerCase()).replace('-', ' ');;
            const regionReceveid = region.toLowerCase().replace('-', ' ');
            if(cityRegionLowCase == regionReceveid){
                dataAsked = city;
            }
            return dataAsked;
        })
        return citiesFound;
    }

    async searchCityForState(queries){
        const {state} = queries;
        await this.cleanData();
        const cities = this.allCities;
        const citiesFound = await cities.filter(city =>{
            let dataAsked;
            const cityStateLowCase = (city.state.toLowerCase());
            const stateReceveid = state.toLowerCase();
            if(cityStateLowCase == stateReceveid){
                dataAsked = city;
            }
            return dataAsked;
        })
        return citiesFound;
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

