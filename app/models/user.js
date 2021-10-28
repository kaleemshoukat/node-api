const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({

    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    walletSecret: {
        type: String,
        required: true
    },
    enrollmentId: {
        type: String,
        required: true
    },
    comments: [{
        type: String,
    }],
    uploadedDocs: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }],
    accessToken: {
        type: String,
        default: ''
    },
    organization: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    }
});

///statics vs methods: statics can be invoked by model
///methods are instance methods
UserSchema.methods.updateName = function (newName) {
    this.name = newName
    return this.save()
}

UserSchema.methods.updateEmail = function (newEmail) {
    this.email = newEmail
    return this.save()
}

UserSchema.methods.updatePassword = function (newPass) {
    ///TODO: Going to have to rehash
    this.password = newPass
    return this.save()
}

UserSchema.methods.updateOrg = function (newOrg) {
    this.organization = newOrg
    return this.save()
}

UserSchema.methods.updateToken = async function (token) {
    this.accessToken = token
    return this.save()
}

UserSchema.statics.getUserByEnrollmentId = async function (enrollmentId) {
    let search = { enrollmentId: enrollmentId }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserByEmail = async function (email) {
    let search = { email: email }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserByName = async function (name) {
    let search = { name: name }
    let foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserByMongoID = async function (id) {
    ///Make sure to cast id as ObjectID
    let objID = mongoose.Types.ObjectId(id)
    let search = { _id: objID }
    let user = null
    user = await User.findById(search)
    return user
}

UserSchema.statics.comparePasswords = async function (candidatePassword, password) {
    ///Gonna utilize bcrypt for hashing/dehashing -> Should look into limitations of bcrypt
    let comparison = await bcrypt.compare(candidatePassword, password)
    return comparison ///Will return true or false in promise form
}

UserSchema.statics.saltAndSave = async function (user) {
    let encrypt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(user.password, encrypt)
    user.password = hash
    let newUser = await user.save()
    return newUser
}

UserSchema.statics.stripToJSON = async function (user) {
    let obj = user.toObject()
    await delete obj['password']
    return obj
}

var User = module.exports = mongoose.model('User', UserSchema)
