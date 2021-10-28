const router = require('express').Router()
const subjectController= require('../controllers/subjectController')

router.post('/', subjectController.list)
router.get('/:id', subjectController.getById)


module.exports = router