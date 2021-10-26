const router = require('express').Router()
const subjectController= require('../controllers/subjectController')

router.get('/', subjectController.subjects)


module.exports = router