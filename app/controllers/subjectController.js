const axios= require('axios')
const apiResponse=require('../helpers/apiResponse')
const EndPoint=require('../services/endpoints')

exports.list= async (req, res, next) => {
    try{
        const body=req.body
        const data={
            gender: body.gender,
            consent: body.consent,
            zipCode: body.zipCode,
            lAge: body.lAge,
            gAge: body.gAge
        }

        const url=EndPoint.SUBJECTS_BY_QUERY+'?limit='+body.limit+'&bookmark='+body.bookmark
        const result= await axios.post(url, data)
        res.send({
            result: result.data
        })
    }
    catch (error){
        res.status(error.status || 400).send(apiResponse.error(error.message))
    }
}

exports.getById= async (req, res, next) => {
    try{
        const url=EndPoint.SUBJECTS_BY_ID+'/'+req.params.id
        const result= await axios.get(url)
        res.send({
            result: result.data
        })
    }
    catch (error){
        res.status(error.status || 400).send(apiResponse.error(error.message))
    }
}

