const ibgeController = require("./IbgeController")
const CitiesNotFound = require('../errors/CitiesNotFound')
const UfLowCaseError = require('../errors/UfLowCase')
const UfLengthError = require('../errors/UfLengthError')

class CitiesController {
    static async getAllCitiesOrSearchByParams(req, res){
        const queries = req.query;
        try{
            let data =  await CitiesController.searchByQueries(queries);
            await CitiesController.handleError404(data);
            return res.status(200).send(data);
        }catch(error){
            let status = 500;
            console.error(error)
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
        if(queries.hasOwnProperty('uf')){
            data = await ibgeController.searchCityForUf(queries);
        }else if(queries.hasOwnProperty('name')){
            data = await ibgeController.searchForCityName(queries);
        }else if(queries.hasOwnProperty('region')){
            data = await ibgeController.searchForCityRegion(queries);
        }else if(queries.hasOwnProperty('state')){
            data = await ibgeController.searchCityForState(queries);
        }else{
            data = await ibgeController.searchAllCities();
        }
        return data;
    }
    
    static async handleError404(data){
        if(data.length == 0){
            throw new CitiesNotFound()
        }
    }
}

module.exports = CitiesController; 