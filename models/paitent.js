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
    questions: [{
        type: String
    }],
    answers: [{
        type: Number
    }],
    openAnswer: String,
    totalScore: Number
});


var AccessSchema = new mongoose.Schema({
    stageBool: Boolean,
    exerciseBool: [{ type: Boolean }]

});

var PaitentSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    protocol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Protocol'
    },

    treatmentTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreatmentType'
    }],

    accesses: [AccessSchema],
    reports: [ReportSchema],
}, { collection: ' Paitents' });
//need to add more attr here! highRecord,ScoreList,Access

PaitentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Paitent", PaitentSchema);