const axios= require('axios')
const apiResponse=require('../helpers/apiResponse')

exports.subjects= async (req, res, next) => {
    try{
        const result= await axios.get('http://ec2-54-67-14-59.us-west-1.compute.amazonaws.com:3000/api/subject/getAllSubjects')

        res.send({
            result: result.data
        })
    }
    catch (error){
        res.send(apiResponse.error(error, null, error.status))
    }
}