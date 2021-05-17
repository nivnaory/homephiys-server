mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose = require("mongoose");
const { Collection } = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//define User Entity
//need to decide if there is username

const ReportSchema = new mongoose.Schema({
    stageLevel: Number,
    exerciseLevel: Number,
    score: Number,
    questions: [{
        type: String
    }],
    answers: [{
        type: Number
    }],
    openAnswer: String,

});


var AccessSchema = new mongoose.Schema({
    stageBool: Boolean,
    exerciseBool: [{ type: Boolean }]

});

var PatientSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    treatmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreatmentType'
    },

    accesses: [AccessSchema],
    reports: [ReportSchema],
}, { collection: ' Patients' });
//need to add more attr here! highRecord,ScoreList,Access

PatientSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Patient", PatientSchema);