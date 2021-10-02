class CitiesNotFound extends Error{
    constructor(){
        super('no city was found with the given parameters');
        this.name = 'CitiesNotFound';
        this.idError = 1
    }
}

module.exports = CitiesNotFound;