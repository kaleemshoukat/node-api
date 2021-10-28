const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Going to pass around subject_id
var SubjectSchema = Schema({
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    consent: {
        type: Boolean,
        required: true,
        default: false
    },
    age: {
        type: Number,
        default: null
    },
    zipCode: {
        type: String,
        default: ''
    },
    medicalCodes: {
        type: [String],
        default: ''
    },
    insurance: {
        type: String,
        required: true
    }
})

// It's important to note -
// We map the default mongoose _id to subject_id for the frontend & blockchain
SubjectSchema.statics.getSubjectById = async function (subjectId) {
    ///Make sure to cast id as ObjectID
    const objID = mongoose.Types.ObjectId(subjectId)
    const search = { _id: objID }
    let subject = null
    subject = await Subject.findById(search)
    return subject
}

var Subject = module.exports = mongoose.model('Subject', SubjectSchema)
