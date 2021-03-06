var express = require("express");
const { Mongoose } = require("mongoose");
const patient = require("../models/patient");
const Protocol = require("../models/Protocol");

var router = express.Router();
Patient = require("../models/patient");



router.get("/:username", async(req, res) => {
    const patient = await Patient
        .findOne({ username: req.params.username }).populate({ path: "treatmentType", populate: { path: "protocol" } })
    if (patient) {
        res.json(patient);
    } else {
        res.status(404)

    }

});




router.post("/:username/report", async(req, res) => {
    //create new report
    const patient = await Patient.findOne({ username: req.params.username })
    patient.reports.push({
        stageLevel: req.body.stageLevel,
        exerciseLevel: req.body.exerciseLevel,
        score: req.body.score,
        questions: req.body.questions,
        answers: req.body.answers,
        openAnswer: req.body.openAnswer,

    });

    patient.save()
});


//get all reports From Db
router.get("/:username/allReports", async(req, res) => {
    var reports = await Patient.findOne({ username: req.params.username }, 'reports');
    if (reports)
        res.json(reports)
    else {
        res.json(404);
    }
});

router.put("/:username/accesses", async(req, res) => {

    const accessesIndex = req.body.stageLevel;
    const exerciseBoolIndex = req.body.exerciseLevel;
    const isStageFinish = req.body.isFinished;

    if (isStageFinish == true) {
        const update = {
            $set: {
                [`accesses.${accessesIndex}.stageBool`]: true

            }
        };
        await Patient.updateOne({ username: req.params.username }, update);
    }


    const update = {
        $set: {
            [`accesses.${accessesIndex}.exerciseBool.${exerciseBoolIndex}`]: true
        }
    };
    await Patient.updateOne({ username: req.params.username }, update);
});


router.put("/:username/highScore", async(req, res) => {
    const stageIndex = req.body.stageIndex;
    const exerciseIndex = req.body.exerciseIndex;
    const highScore = req.body.highScore;

    const update = {
        $set: {
            [`scoreList.${stageIndex}.highScoreList.${exerciseIndex}`]: highScore
        }
    };

    const patient = await Patient.updateOne({ username: req.params.username }, update);
    if (patient) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

router.put("/:username/updateNote", async(req, res) => {
    const stageIndex = req.body.stageIndex;
    const exerciseIndex = req.body.exerciseIndex;
    const note = req.body.note;
    console.log(note)

    const update = {
        $set: {
            [`therapistNotes.${stageIndex}.noteForExercise.${exerciseIndex}`]: note
        }
    };

    const patient = await Patient.updateOne({ username: req.params.username }, update);
    if (patient) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }


});
module.exports = router;