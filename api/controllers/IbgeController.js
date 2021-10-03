const callAxios = require('../services/callAxiosService')
const UfLowCase = require('../errors/UfLowCase')
const UfLengthError = require('../errors/UfLengthError')
const CitiesNotFound = require('../errors/CitiesNotFound')
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

    async searchCityByUfNameAndRegion(queries){
        await this.cleanData();
        const {uf, name, region} = queries;
        await this.findErrorUf(uf)
        const citiesFound = await this.allCities.filter(city =>{
            const cityNameLowCase = (city.name.toLowerCase());
            const nameReceveid = name.toLowerCase();
            const cityRegionLowCase = (city.region.toLowerCase()).replace('-', ' ');;
            const regionReceveid = region.toLowerCase().replace('-', ' ');
            if(city.uf == uf && cityNameLowCase.includes(nameReceveid) && cityRegionLowCase.includes(regionReceveid)){
                return city;
            }
        })
        return citiesFound;
    } 

    async searchCityByUf(queries){
        await this.cleanData();
        const {uf} = queries;
        await this.findErrorUf(uf)
        const citiesFound = await this.allCities.filter(city =>{
            if(city.uf == uf){
                return city;
            }
        })
        return citiesFound;
    } 

    async searchCityByName(queries){
        await this.cleanData();
        const {name} = queries;
        const citiesFound = await this.allCities.filter(city =>{
            const cityNameLowCase = (city.name.toLowerCase());
            const nameReceveid = name.toLowerCase();
            if(cityNameLowCase.includes(nameReceveid)){
                return city;
            }
        })
        return citiesFound;
    }

    async searchCityByRegion(queries){
        await this.cleanData();
        const {region} = queries;
        const citiesFound = await this.allCities.filter(city =>{
            const cityRegionLowCase = (city.region.toLowerCase()).replace('-', ' ');;
            const regionReceveid = region.toLowerCase().replace('-', ' ');
            if(cityRegionLowCase.includes(regionReceveid)){
                return city;
            }
        })
        return citiesFound;
    }

    async searchCityByState(queries){
        await this.cleanData();
        const {state} = queries;
        const citiesFound = await this.allCities.filter(city =>{
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

    async handleError404(data){
        if(data.length == 0){
            throw new CitiesNotFound()
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

