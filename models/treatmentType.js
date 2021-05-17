mongoose = require("mongoose");
//const therapist = require("./stage");
//define User Entity
var ExerciseSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: Number,
    exerciseId: Number,
    urlAddress: String,
    questions: [{
            type: String
        }]
        //need to add also the video
});

var StageSchema = new mongoose.Schema({
    currentLevel: Number,
    exerciseList: [ExerciseSchema],
    scoreForCurrentStage: Number,
});

var TreatmentTypeSchema = new mongoose.Schema({
    type: String,
    treatmentId: Number,
    scoreForCurrentExercise: Number,
    stageList: [
        StageSchema,
    ],

    protocol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Protocol'
    },

}, { collection: 'TreatmentType' });
//need to add more attr
module.exports = mongoose.model("TreatmentType", TreatmentTypeSchema);