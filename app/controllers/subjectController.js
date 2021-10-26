const axios= require('axios')


exports.subjects= async (req, res, next) => {
    const result= await axios.get('http://ec2-54-67-14-59.us-west-1.compute.amazonaws.com:3000/api/subject/getAllSubjects')
    console.log(result.data)

    res.send({
        result: result.data
    })
}