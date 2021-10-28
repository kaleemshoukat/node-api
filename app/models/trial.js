const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Trials are created and saved in the backend, 
// Mongo simply saves metadata around the trial
// TODO: Create a way to ensure mapping of _id to trial
var TrialSchema = Schema({

    // Going to use the mongoose default _id field to set trialId, 
    // _id is unique based on timestamp
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    // Insurance Company subject data's polled from
    Insurance: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        default: Date.now,
        required: true
    },
    enddate: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    // Target number of subjects needed for trial
    totaltarget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    // Researcher/User associated with trial
    researcher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Subjects(Patients) SubDoc Array attached to a trial
    subjects: {
        type: [Schema.Types.ObjectId],
        ref: 'Subject'
    }
})

// TODO: Wrap db functions in try catch for Mongoose DocumentNotFoundError
TrialSchema.statics.getTrialByInsurance = async function (insurance) {
    let search = { Insurance: insurance }
    let foundTrial = null
    foundTrial = await Trial.findOne(search)
    return foundTrial
}

TrialSchema.statics.getTrialByName = async function (name) {
    let search = { name: name }
    let foundTrial = null
    foundTrial = await Trial.findOne(search)
    return foundTrial
}

// It's important to note -
// We map the default mongoose _id to trial_id for the frontend & blockchain
TrialSchema.statics.getTrialById = async function (trailId) {
    ///Make sure to cast id as ObjectID
    const objID = mongoose.Types.ObjectId(trailId)
    const search = { _id: objID }
    let trial = null
    trial = await Trial.findById(search)
    return trial
}

TrialSchema.statics.allTrials = async function () {
    let trials = null
    trials = await Trial.find()
    return trials
}

// Should not be an instanace method b/c could by any trial being updated
// this. would be pointless here
TrialSchema.statics.updateTrial = async function (trial) {
    const objID = mongoose.Types.ObjectId(trial.trailId)
    // new:true returns the updated document
    // runValidators only validates against passed in fields
    const options = { new: true, runValidators: true }
    let updatedTrial = null
    updatedTrial = await Trial.findByIdAndUpdate(objID, trial, options)
    return updatedTrial
}

var Trial = module.exports = mongoose.model('Trial', TrialSchema)