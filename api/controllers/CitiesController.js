const ibgeController = require("./IbgeController")
const CitiesNotFound = require('../errors/CitiesNotFound')
const UfLowCaseError = require('../errors/UfLowCase')
const UfLengthError = require('../errors/UfLengthError')

class CitiesController {
    static async getAllCitiesOrSearchByParams(req, res){
        const queries = req.query;
        try{
            let data =  await CitiesController.searchByQueries(queries);
            await ibgeController.handleError404(data);
            return res.status(200).json(data);
        }catch(error){
            let status = 500;
            if(error instanceof CitiesNotFound){
                status = 404;
            }else if (error instanceof UfLowCaseError || UfLengthError){
                status = 400
            }
            return res.status(status).json({message: error.message})
        }
    }

    static async searchByQueries(queries){
        let data;
        const hasUf = queries.hasOwnProperty('uf');
        const hasName = queries.hasOwnProperty('name');
        const hasRegion = queries.hasOwnProperty('region');
        const hasState = queries.hasOwnProperty('state');
        if(hasUf && hasName && hasRegion){
            data = await ibgeController.searchCityByUfNameAndRegion(queries)
        }else if(hasUf){
            data = await ibgeController.searchCityByUf(queries);
        }else if(hasName){
            data = await ibgeController.searchCityByName(queries);
        }else if(hasRegion){
            data = await ibgeController.searchCityByRegion(queries);
        }else if(hasState){
            data = await ibgeController.searchCityByState(queries);
        }else{
            data = await ibgeController.searchAllCities();
        }
        return data;
    }
    
   
}

module.exports = CitiesController; 