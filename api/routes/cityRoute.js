const {Router} = require('express');
const CitiesController = require('../controllers/CitiesController')
const router = Router();


router.get('/api/city?', CitiesController.getAllCitiesOrSearchByParams)

module.exports = router;