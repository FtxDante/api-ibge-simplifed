class UfLengthError extends Error{
    constructor(){
        super('the uf field must have only two letters”');
        this.name = 'UfLengthError';
        this.idError = 3
    }
}

module.exports = UfLengthError;