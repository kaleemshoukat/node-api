const router = require('express').Router()
const subjectRoutes= require('./subjectRoutes')

router.use('/subjects', subjectRoutes)


module.exports = router