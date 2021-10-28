const express = require('express')
const bodyParser = require('body-parser')
const morgan= require('morgan')
const helmet= require('helmet')
const dotenv= require('dotenv').config()
const app = express()

//set listener
const port = process.env.ENV==='DEV' ? process.env.API_PORT_DEV : process.env.API_PORT_PROD
app.listen(port, () => { console.log(`App running on port ${port}`) });

if (process.env.ENV === 'DEV') {
    app.use(morgan('dev'));
}

/*Initialize DB*/
require('./config/db')
/*Security Headers*/
app.use(helmet())
/*JSON Input Handling*/
app.use(bodyParser.json())

// import the routes
app.use('/api', require('./app/routes'));

module.exports = app
