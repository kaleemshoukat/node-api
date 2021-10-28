const user = require('./models/user');
const trial = require('./models/trial');
const subject = require('./models/subject');

module.exports.model = function () {
    return {
        User: user(),
        Trial: trial(),
        Subject: subject()
    };
}

//access like this in all files
// const model=require('../models').model()
// const user = new model.User()
