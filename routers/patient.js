var express = require("express");
const { Mongoose } = require("mongoose");
const patient = require("../models/patient");
const Protocol = require("../models/Protocol");

var router = express.Router();
Patient = require("../models/patient");



router.get("/:username", async(req, res) => {
    const patient = await Paitent
        .findOne({ username: req.params.username }).populate({ path: "treatmentType", populate: { path: "protocol" } })

    res.json({
        username: patient.username,
        password: patient.password,
        name: patient.name,
        treatmentType: patient.treatmentType,
        accesses: patient.accesses,
        protocol: patient.treatmentType.protocol,
        reports: patient.reports

        //reports:paitnetn.reports
    });
    //
    res.status(200)
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

router.post("/:username/accesses", async(req, res) => {
    console.log("im here");
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
router.put("/:username/highScore", function(req, res) {
    Patient
        .findOne({ username: req.params.username }).populate("treatmentTypes")
        .exec(function(err, patient) {
            if (err) return handleError(err);
            if (!patient) {
                res.status(400).send();
            }

        });
})




module.exports = router;