class UfLowCase extends Error{
    constructor(){
        super('invalid uf field, its value must be upper case');
        this.name = 'UfLowCase';
        this.idError = 2
    }
}

module.exports = UfLowCase;